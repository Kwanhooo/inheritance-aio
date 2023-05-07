<template>
  <div style="margin-top: 5rem">
    <div class="contact-wrapper">
      <div class="contact-tips-text">
        您有遇到任何问题或是需要更详细的信息吗？
      </div>
      <div>
        <button class="contact-btn">联系我们</button>
      </div>
    </div>
    <div class="bottom-bar-wrapper">
      <div class="left">
        <img src="@/../public/bottom-logo.png" alt="logo" class="logo" @click.prevent="$router.push('/dashboard')">
        <div class="item beian">
          <div class="title">备案信息</div>
          <div class="value">粤ICP备2022013690号-2</div>
        </div>
      </div>
      <div class="right">
        <div class="item follow">
          <div class="title">关注我们</div>
          <div class="value">&#64;中南知新馆</div>
        </div>
        <div class="item copyright">
          <div class="title">版权声明</div>
          <div class="value">&copy; 2022 CSU, Org. or its affiliates.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BottomBar'
}
</script>

<style lang="scss" scoped>
@import "./BottomBar";
</style>
