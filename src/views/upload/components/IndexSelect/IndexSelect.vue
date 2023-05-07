<template>
  <div class="mySelect">
    <el-cascader
      ref="cas"
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
    name: 'IndexSelect',
    data() {
        return {
            options: [],
            props: {
                value: 'index',
                label: 'nodeName',
                children: 'nextNodes',
                showAllLevels: false
            },
            indexArray: []
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
            this.indexArray = value
        },
        getIndexString() {
            let indexString = this.indexArray.join('-')
            if (indexString === '') {
                indexString = '1'
            } else {
                indexString = '1-' + indexString
            }
            return indexString
        },
        clear() {
            this.$refs.cas.handleClear({})
        }
    }
}
</script>
<style lang="scss" scoped>
@import "IndexSelect";
</style>
