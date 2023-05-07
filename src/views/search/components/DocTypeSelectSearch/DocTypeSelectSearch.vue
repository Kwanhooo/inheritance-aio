<template>
  <el-select
    v-model="selection"
    multiple
    collapse-tags
    placeholder="选择文档类别"
    @change="handleDocTypeSelectChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      {{ item.label }}
    </el-option>
  </el-select>
</template>

<script>
import { mapState } from 'vuex'
import { getAllTypes } from '@/api/file-classification'

export default {
    name: 'DocTypeSelectSearch',
    data() {
        return {
            options: [],
            selection: []
        }
    },
    computed: {
        ...mapState({
            docTypeSelect: state => state.search.docTypeSelect
        })
    },
    created() {
        getAllTypes().then(res => {
            res.data.forEach(item => {
                this.options.push({
                    label: item.typeName,
                    value: item.id
                })
            })
        })
    },
    methods: {
        handleDocTypeSelectChange(value) {
            // TODO: 暂时关闭选择器的触发
            // this.$store.commit('search/SET_DOC_TYPE_SELECT', value)
            // this.$store.dispatch('search/FetchResults')
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
