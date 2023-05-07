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
    name: 'DocTypeSelect',
    data() {
        return {
            options: [],
            selection: []
        }
    },
    computed: {
        ...mapState({
            docTypeSelect: state => state.overview.docTypeSelects
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
            this.$store.commit('overview/SET_DOC_TYPE_SELECT', value)
            this.$store.dispatch('overview/FetchTags')
            this.$store.dispatch('overview/FetchDocs')
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
