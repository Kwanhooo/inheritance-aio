<template>
  <div>
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
        @keyup.enter.native="handleSearch()"
      >
        <el-button slot="suffix" round @click="handleSearch()">
          Search&emsp;<i class="el-icon-search" />
        </el-button>
      </el-input>
    </div>
    <div ref="selectorWrapper" class="selector-wrapper">
      <div class="left">
        <major-select />
        <doc-type-select />
      </div>
      <div class="right">
        <order-select />
      </div>
    </div>
    <el-divider />
    <div class="mainPage">
      <div class="theme-tab-wrapper">
        <ThemeTab />
      </div>
      <div class="docs-wrapper">
        <div v-show="loading" class="skeleton-wrapper">
          <el-skeleton :rows="10" animated :throttle="500" />
        </div>
        <div v-if="(!docs || docs.length === 0) && !loading" class="empty-tips">暂无相关文档，请减少条件后再试！</div>
        <DocOverview v-for="doc in docs" v-show="!loading" :key="doc.fileId" :doc="doc" />
        <div v-for="index in 4" :key="'placeholder-block-' + index" class="placeholder-block" />
      </div>
      <div class="pagination-wrapper">
        <Pagination />
      </div>
    </div>

  </div>
</template>
<script>
import ThemeTab from './components/ThemeTab/ThemeTab.vue'
import DocOverview from '@/views/home/components/DocOverview'
import DocTypeSelect from '@/views/home/components/DocTypeSelect/DocTypeSelect.vue'
import MajorSelect from '@/views/home/components/MajorSelect/MajorSelect.vue'
import Pagination from '@/views/home/components/Pagination'
import { mapState } from 'vuex'
import OrderSelect from '@/views/home/components/OrderSelect/OrderSelect'

export default {
    components: { MajorSelect, DocTypeSelect, ThemeTab, DocOverview, Pagination, OrderSelect },
    data() {
        return {
            keywords: ''
        }
    },
    computed: {
        ...mapState({
            docs: state => state.overview.docs,
            loading: state => state.overview.loading
        })
    },
    created() {
        this.$store.dispatch('overview/FetchDocs')
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleSearch() {
            // console.log(this.keywords)
            // this.$store.dispatch('overview/DoSearchKeyword', this.keywords)
            this.$router.push({ path: '/search', query: { keywords: this.keywords }})
        },
        handleScroll() {
            if (this.$refs.selectorWrapper.getBoundingClientRect().top === 0) {
                this.$refs.selectorWrapper.classList.add('shadow')
            } else {
                this.$refs.selectorWrapper.classList.remove('shadow')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "home";
</style>
