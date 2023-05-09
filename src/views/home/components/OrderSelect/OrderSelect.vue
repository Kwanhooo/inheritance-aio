<template>
  <el-radio-group v-model="orderBy" text-color="#ff9235" fill="white" @input="changeOrderBy">
    <el-radio-button label="time">
      <font-awesome-icon icon="fa-solid fa-sort" />
      按时间排序
    </el-radio-button>
    <el-radio-button label="hot">
      <font-awesome-icon icon="fa-solid fa-sort" />
      按热度排序
    </el-radio-button>
  </el-radio-group>
</template>

<script>

export default {
    name: 'OrderSelect',
    data() {
        return {
            orderBy: 'time'
        }
    },
    methods: {
        changeOrderBy(value) {
            this.$store.commit('overview/SET_ORDER_BY', value)
            // TODO  触发更新文档事件，等后端接口完善
        }
    }
}
</script>

<style scoped>
/deep/ .el-radio-button__inner {
    border: none;
    color: darkgray;
}
</style>
