<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :current-page="pageNum"
    @current-change="handleCurrentChange"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'PaginationSearch',
    computed: {
        ...mapState({
            total: state => state.search.total,
            pageSize: state => state.search.pageSize,
            pageNum: state => state.search.pageNum
        })
    },
    methods: {
        handleCurrentChange(val) {
            this.$store.commit('search/SET_PAGE_NUM', val)
            this.$store.dispatch('search/FetchDocs')
        }
    }
}
</script>

<style scoped>
</style>
