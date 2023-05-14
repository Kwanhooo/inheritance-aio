<template>
  <div class="doc-search-wrapper">
    <input
      v-model="keywords"
      type="search"
      placeholder="查找需要的资料..."
      class="search-input"
      @keydown.enter="handleSearch"
    >
    <button class="search-btn" @click="handleSearch">
      🔍
    </button>
  </div>
</template>

<script>
export default {
    name: 'DocSearch',
    data() {
        return {
            keywords: ''
        }
    },
    mounted() {
    },
    methods: {
        handleSearch() {
            console.log(this.keywords)
            this.$router.push({ path: '/search', query: { keywords: this.keywords }})
        }
    }
}
</script>

<style lang="scss" scoped>
@import "DocSearch.scss";
</style>
