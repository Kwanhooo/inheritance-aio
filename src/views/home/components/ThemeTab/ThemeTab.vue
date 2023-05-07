<template>
  <div class="el-menu-wrapper">
    <el-menu :default-active="activeThemeId.toString()" @select="handleSelect">
      <el-menu-item :index="Number(0).toString()">全部</el-menu-item>
      <el-menu-item v-for="(item,index) in allThemes" :key="index" :index="Number(item.id).toString()">
        {{ item.tagName }}
        <el-tag type="warning">{{ item.fileTotal }}</el-tag>
      </el-menu-item>
    </el-menu>
  </div>

</template>
<script>

import { mapState } from 'vuex'

export default {
    data() {
        return {
            themeList: []
        }
    },
    computed: {
        ...mapState({
            activeThemeId: state => state.overview.activeThemeId,
            allThemes: state => state.overview.allThemes
        })
    },
    created() {
        this.$store.dispatch('overview/FetchTags')
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$store.commit('overview/SET_ACTIVE_THEME_ID', Number(key))
            this.$store.dispatch('overview/FetchDocs')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "ThemeTab";
</style>
