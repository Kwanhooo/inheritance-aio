import { getFilesByKeyword } from '@/api/file-list'
import Vue from 'vue'

const state = {
    pageNum: 1,
    pageSize: 4,
    orderBy: 'time',
    keywords: '',
    docTypeSelect: [],
    indexArray: [],
    docs: [],
    loading: false,
    loadingMore: false,
    reachEnd: false
}

const mutations = {
    SET_DOC_TYPE_SELECT(state, docTypeSelect) {
        state.docTypeSelect = docTypeSelect
    },
    SET_INDEX_ARRAY(state, indexArray) {
        state.indexArray = indexArray
    },
    SET_PAGE_NUM(state, pageNum) {
        state.pageNum = pageNum
    },
    NEXT_PAGE_NUM(state) {
        state.pageNum = state.pageNum + 1
    },
    ROLLBACK_PAGE_NUM(state) {
        state.pageNum = state.pageNum - 1
    },
    RESET_PAGE_NUM(state) {
        state.pageNum = 1
    },
    SET_DOCS(state, docs) {
        state.docs = docs
    },
    SET_KEYWORDS(state, keywords) {
        state.keywords = keywords
    },
    SET_ORDER_BY(state, orderBy) {
        state.orderBy = orderBy
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_LOADING_MORE(state, loadingMore) {
        state.loadingMore = loadingMore
    },
    SET_REACH_END(state, reachEnd) {
        state.reachEnd = reachEnd
    }
}

const actions = {
    FetchResults({ commit, state }) {
        Vue.prototype.$customLoading.show('正在搜寻...', 400)
        commit('SET_LOADING', true)
        commit('RESET_PAGE_NUM')
        commit('SET_REACH_END', false)
        // todo 添加相关接口后再补充功能
        // TODO: 链接搜索 API
        getFilesByKeyword(state.keywords, state.pageNum, state.pageSize).then((res) => {
            commit('SET_DOCS', res.data)
            const length = res.data.length
            if (length < state.pageSize) {
                commit('SET_REACH_END', true)
            }
            if (length === 0) {
                Vue.prototype.$customLoading.finishWithFeedback('没有找到相关的文档...')
            } else {
                Vue.prototype.$customLoading.finishWithFeedback('已找到相关文档！')
            }
            commit('SET_LOADING', false)
        }).catch(() => {
            Vue.prototype.$message.error('无连接，请检查网络后再试')
            Vue.prototype.$customLoading.finishWithFeedback('无连接，请检查网络后再试')
        })
    },
    LoadMore({ commit, state }) {
        if (state.loadingMore || state.docs.length <= 0 || state.reachEnd) {
            return
        }
        console.log('DO LOAD MORE')
        commit('SET_LOADING_MORE', true)
        commit('NEXT_PAGE_NUM')
        getFilesByKeyword(state.keywords, state.pageNum, state.pageSize).then((res) => {
            if (res.data.length === 0) {
                commit('SET_LOADING_MORE', false)
                commit('SET_REACH_END', true)
            } else {
                commit('SET_DOCS', state.docs.concat(res.data))
            }
        }).catch(() => {
            // 回滚页码
            commit('ROLLBACK_PAGE_NUM')
        }).finally(() => {
            commit('SET_LOADING_MORE', false)
        })
    }
}

export default {
    namespaced: true, state, mutations, actions
}

