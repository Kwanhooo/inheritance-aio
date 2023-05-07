<template>
  <!-- 应用transition动画跳转 -->
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img src="../../../../../public/logo.png" class="sidebar-logo" alt="">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img alt="" class="sidebar-logo" src="../../../../../public/logo.png">
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
    name: 'SidebarLogo',
    props: {
        collapse: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./Logo.scss";
</style>
