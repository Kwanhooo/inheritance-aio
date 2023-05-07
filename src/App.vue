<template>
  <div id="app">
    <router-view />
    <loading ref="loading" />
  </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'App',
    mounted() {
        Vue.prototype.$customLoading = this.$refs.loading
    }
}
</script>
