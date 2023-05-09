<template>
  <div class="app-main">
    <img src="@/assets/image/csu-logo.png" class="logo" alt="csu" @click="$router.push('/login')">
    <img src="@/assets/image/background.png" class="background" alt="bg">
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

<style scoped lang="scss">
@import "@/styles/variables";

.app-main {
    max-height: 100vh;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    position: relative;
    border-top: $aio-theme-1 8vh solid;
    border-bottom: $aio-theme-1 4vh solid;
    border-left: $aio-theme-1 2vw solid;
    border-right: $aio-theme-1 2vw solid;
    //overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;

    .logo {
        height: 6vh;
        position: fixed;
        top: 1vh;
        left: 4vh;
        cursor: pointer;
    }

    .background {
        position: fixed;
        bottom: 0;
        left: 0;
        width: calc(100% - 4vh);
        height: auto;
    }
}

.fixed-header + .app-main {
    padding-top: 50px;
}
</style>

<style lang="scss">
@import 'AppMain';
</style>
