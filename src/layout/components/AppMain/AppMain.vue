<template>
  <div class="app-main">
    <img src="@/assets/image/csu-logo.png" class="logo" alt="csu">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
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
    max-height: 100vh;
    min-height: 100vh;
    width: 100%;
    position: relative;
    border-top: #016dab 8vh solid;
    border-bottom: #016dab 4vh solid;
    border-left: #016dab 2vw solid;
    border-right: #016dab 2vw solid;
    overflow: auto;

    .logo {
        height: 6vh;
        position: fixed;
        top: 1vh;
        left: 4vh;
    }
}

.fixed-header + .app-main {
    padding-top: 50px;
}
</style>

<style lang="scss">
@import 'AppMain';
</style>
