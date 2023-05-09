<template>
  <div :class="classObj" class="app-wrapper">
    <!--    <sidebar class="sidebar-container" />-->
    <div class="main-container">
      <!--      <navbar />-->
      <app-main />
    </div>
    <!--    <div>-->
    <!--      <bottom-bar />-->
    <!--    </div>-->
  </div>
</template>

<script>
// import { Navbar, Sidebar, AppMain, BottomBar } from './components'
import { AppMain } from './components'

export default {
    name: 'Layout',
    components: {
        // Navbar,
        // Sidebar,
        AppMain
        // BottomBar
    },
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar
        },
        classObj() {
            return { hideSidebar: !this.sidebar.opened }
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px)
}
</style>
