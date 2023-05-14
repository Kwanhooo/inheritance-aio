<template>
  <div>
    <div class="top-bar">
      <div class="page-name-wrapper">
        <img v-if="this.$route.query.type === 'GUIDE'" class="icon" src="@/assets/svg/guide.svg" alt="guide">
        <img v-else class="icon" src="@/assets/svg/system.svg" alt="system">
        <div class="text" style="display: flex;align-items: center">
          {{ this.$route.query.type === 'SUBJECT' ? '课程科目类' : '学业规划类' }}
          <img src="@/assets/svg/right.svg" style="width: 1.5vw;margin:0 .5vw;">
          <span v-if="activeThemeName" class="catalog-name">{{ activeThemeName }}</span>
        </div>
      </div>
      <div class="back-wrapper" @click="$router.back()">
        <img class="icon" src="@/assets/svg/home.svg" alt="home">
        <div class="text">返回上一页</div>
      </div>
    </div>
    <div ref="selectorWrapper" class="selector-wrapper">
      <div class="left">
        <doc-search />
        <major-select />
        <doc-type-select />
      </div>
      <div class="right">
        <order-select />
      </div>
    </div>
    <el-divider />
    <div class="mainPage">
      <!--      <div class="theme-tab-wrapper">-->
      <!--        <ThemeTab />-->
      <!--      </div>-->
      <div class="docs-wrapper">
        <div v-show="loading" class="skeleton-wrapper">
          <el-skeleton :rows="10" animated :throttle="500" />
        </div>
        <div v-if="(!docs || docs.length === 0) && !loading" class="empty-tips">
          暂无相关文档，请减少条件后再试！
        </div>
        <DocCover v-for="(doc,index) in docs" v-show="!loading" :key="doc.fileId" :doc="doc" :index="index" />
        <!--        <div v-for="index in 4" :key="'placeholder-block-' + index" class="placeholder-block" />-->
      </div>
      <div class="pagination-wrapper">
        <Pagination />
      </div>
    </div>

  </div>
</template>
<script>
import DocTypeSelect from '@/views/home/components/DocTypeSelect/DocTypeSelect.vue'
import MajorSelect from '@/views/home/components/MajorSelect/MajorSelect.vue'
import Pagination from '@/views/home/components/Pagination'
import { mapState } from 'vuex'
import OrderSelect from '@/views/home/components/OrderSelect/OrderSelect'
import DocCover from '@/views/home/components/DocCover/DocCover'
import DocSearch from '@/views/home/components/DocSearch/DocSearch.vue'

export default {
    components: { DocSearch, DocCover, MajorSelect, DocTypeSelect, Pagination, OrderSelect },
    data() {
        return {
            keywords: ''
        }
    },
    computed: {
        ...mapState({
            docs: state => state.overview.docs,
            loading: state => state.overview.loading,
            activeThemeName: state => state.overview.activeThemeName
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
