import { getFilesByCondition, getFilesByKeyword } from '@/api/file-list'
import { getAllTags } from '@/api/file-classification'

const state = {
    total: 0,
    pageNum: 1,
    pageSize: 4,
    totalPage: 0,
    orderBy: 'time',
    activeThemeId: 0,
    activeThemeName: '全部',
    docTypeSelect: [],
    indexArray: [],
    docs: [],
    allThemes: [],
    loading: true
}

const mutations = {
    SET_ACTIVE_THEME_ID(state, id) {
        state.activeThemeId = id
    },
    SET_ACTIVE_THEME_NAME(state, name) {
        state.activeThemeName = name
    },
    SET_DOC_TYPE_SELECT(state, docTypeSelect) {
        state.docTypeSelect = docTypeSelect
    },
    SET_INDEX_ARRAY(state, indexArray) {
        state.indexArray = indexArray
    },
    SET_PAGE_NUM(state, pageNum) {
        state.pageNum = pageNum
    },
    RESET_PAGE_NUM(state) {
        state.pageNum = 1
    },
    SET_DOCS(state, docs) {
        state.docs = docs
    },
    SET_TOTAL_PAGE(state, totalPage) {
        state.totalPage = totalPage
    },
    SET_ORDER_BY(state, orderBy) {
        state.orderBy = orderBy
    },
    SET_TOTAL(state, total) {
        state.total = total
    },
    SET_ALL_THEMES(state, allThemes) {
        state.allThemes = allThemes
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    }
}

const actions = {
    FetchDocs({ commit, state }) {
        commit('SET_LOADING', true)
        const fileTag = state.activeThemeId === 0 ? '' : state.activeThemeId
        const fileType = state.docTypeSelect.join(',')
        let indexString = state.indexArray.join('-')
        if (indexString === '') {
            indexString = '1'
        } else {
            indexString = '1-' + indexString
        }
        getFilesByCondition(fileTag, fileType, indexString, state.pageNum, state.pageSize, state.orderBy).then(res => {
            commit('SET_DOCS', res.data.records)
            commit('SET_TOTAL_PAGE', res.data.pages)
            commit('SET_TOTAL', res.data.total)
            // 加载完成
            commit('SET_LOADING', false)
        })
    },

    FetchTags({ commit, state }) {
        let indexString = state.indexArray.join('-')
        if (indexString === '') {
            indexString = '1'
        } else {
            indexString = '1-' + indexString
        }
        const fileType = state.docTypeSelect.join(',')
        getAllTags('SUBJECT', indexString, fileType).then(res => {
            commit('SET_ALL_THEMES', res.data)
        })
    },

    DoSearchKeyword({ commit, state }, keyword) {
        commit('RESET_PAGE_NUM')
        getFilesByKeyword(keyword, state.pageNum, state.pageSize).then(res => {
            console.log(res.data)
        })
    }
}

export default {
    namespaced: true, state, mutations, actions
}
