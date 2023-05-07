<template>
  <div class="mySelect">
    <el-cascader
      placeholder="选择相应的学院、专业等"
      :options="options"
      :props="props"
      clearable
      @change="handleChange"
    />
  </div>
</template>

<script>
import { getIndexByString } from '@/api/file-classification'

export default {
    name: 'MajorSelectSearch',
    data() {
        return {
            options: [],
            props: {
                value: 'index',
                label: 'nodeName',
                children: 'nextNodes',
                checkStrictly: true
            }
        }
    },
    mounted() {
        this.fetchIndex()
    },
    methods: {
        fetchIndex() {
            getIndexByString([1]).then(res => {
                this.options = res.data.nextNodes
            })
        },
        handleChange(value) {
            // TODO: 暂时关闭选择器的触发
            // this.$store.commit('search/SET_INDEX_ARRAY', value)
            // this.$store.dispatch('search/FetchResults')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "MajorSelectSearch";
</style>
