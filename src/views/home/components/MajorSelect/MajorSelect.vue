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
            this.$store.commit('overview/SET_INDEX_ARRAY', value)
            this.$store.dispatch('overview/FetchTags')
            this.$store.dispatch('overview/FetchDocs')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "MajorSelect";
</style>
