<template>
  <div class="wrapper">
    <div class="top-bar">
      <div class="page-name-wrapper">
        <img v-if="this.$route.query.type === 'GUIDE'" class="icon" src="@/assets/svg/guide.svg" alt="guide">
        <img v-else class="icon" src="@/assets/svg/system.svg" alt="system">
        <div class="text">{{ this.$route.query.type === 'GUIDE' ? '使用指南' : '系统介绍' }}</div>
      </div>
      <div class="back-wrapper" @click="$router.back()">
        <img class="icon" src="@/assets/svg/home.svg" alt="home">
        <div class="text">返回主页</div>
      </div>
    </div>
    <div class="slogan">
      知新馆宝藏学习资料库
    </div>
    <div class="description" v-html="textNode" />
  </div>
</template>

<script>
import text from './text.json'

export default {
    name: 'Introduction',
    data() {
        return {
            text,
            textNode: this.$route.query.type === 'GUIDE' ? text.guide : text.introduction
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'outline';

</style>
