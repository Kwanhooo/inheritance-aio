<template>
  <div class="search-page-wrapper">
    <div class="headBar">
      <img src="./../../../public/logoBar.png" class="myImg" alt="">
      <div class="bar2" />
      <div class="bar1" />
    </div>
    <div ref="search" class="search">
      <el-input
        v-model="keywords"
        placeholder="请输入您想查询的文档的关键词"
        class="search-input"
        @keyup.enter.native="handleSearch"
      >
        <el-button slot="suffix" round @click="handleSearch">
          Search&emsp;<i class="el-icon-search" />
        </el-button>
      </el-input>
    </div>
    <div ref="selectorWrapper" class="selector-wrapper">
      <div class="left">
        <major-select-search />
        <doc-type-select-search />
      </div>
      <div class="right">
        <order-select-search />
      </div>
    </div>
    <el-divider />
    <div class="search-page-body">
      <div v-if="(!docs || docs.length === 0) && !loading" class="empty-tips">{{ generateEmptyTips() }}</div>
      <div class="results-wrapper">
        <div v-for="doc in docs" :key="doc.fileNo" style="margin-bottom: 5rem">
          <ResultCard :doc="doc" />
        </div>
      </div>
      <div v-show="loading" class="skeleton-wrapper">
        <el-skeleton :rows="15" animated :throttle="500" />
      </div>
      <div v-if="docs && docs.length > 0 && reachEnd" class="reach-end">
        <span>已经到底啦~</span>
      </div>
      <div v-if="docs && docs.length > 0 && !reachEnd" class="reach-end">
        <span>向下滚动以加载...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DocTypeSelectSearch from '@/views/search/components/DocTypeSelectSearch/DocTypeSelectSearch.vue'
import OrderSelectSearch from '@/views/search/components/OrderSelectSearch/OrderSelectSearch.vue'
import MajorSelectSearch from '@/views/search/components/MajorSelectSearch/MajorSelect.vue'
import ResultCard from '@/views/search/components/ResultCard/ResultCard.vue'

export default {
    name: 'Search',
    components: { ResultCard, MajorSelectSearch, OrderSelectSearch, DocTypeSelectSearch },
    data() {
        return {
            keywords: ''
        }
    },
    computed: {
        ...mapState({
            loading: state => state.search.loading,
            loadingMore: state => state.search.loadingMore,
            docs: state => state.search.docs,
            reachEnd: state => state.search.reachEnd
        })
    },
    mounted() {
        if (this.$route.query.keywords && this.$route.query.keywords.trim().length > 0) {
            this.keywords = this.$route.query.keywords
            this.handleSearch()
        }
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleSearch() {
            this.$store.commit('search/SET_DOCS', [])
            this.$store.commit('search/SET_KEYWORDS', this.keywords)
            this.$store.dispatch('search/FetchResults')
        },
        generateEmptyTips() {
            if (this.$store.state.search.keywords === '') {
                return '请输入关键词以搜索'
            } else {
                return `没有找到与“${this.$store.state.search.keywords}”相关的文档`
            }
        },
        handleScroll() {
            const bottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight
            if (bottom <= 140) {
                this.handleLoadMore()
            }
        },
        handleLoadMore() {
            this.$store.dispatch('search/LoadMore')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./search";
</style>
