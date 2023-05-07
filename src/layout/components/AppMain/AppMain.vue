<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>

  </section>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
        key() {
            return this.$route.path
        }
    }
}
</script>

<style scoped>
.app-main {
  /*80 = navbar  */
  min-height: calc(100vh - 80px);
  width: 100%;
  position: relative;
  background-color: #ffffff;
  /*overflow: hidden;*/
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
@import 'AppMain';
</style>
