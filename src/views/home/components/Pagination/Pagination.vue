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
    name: 'Pagination',
    computed: {
        ...mapState({
            total: state => state.overview.total,
            pageSize: state => state.overview.pageSize,
            pageNum: state => state.overview.pageNum
        })
    },
    methods: {
        handleCurrentChange(val) {
            this.$store.commit('overview/SET_PAGE_NUM', val)
            this.$store.dispatch('overview/FetchDocs')
        }
    }
}
</script>

<style scoped>
</style>
