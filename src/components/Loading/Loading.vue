<template>
  <div ref="loading" class="loading-wrapper">
    <div class="cube-wrapper">
      <div class="cube-folding">
        <span class="leaf1" />
        <span class="leaf2" />
        <span class="leaf3" />
        <span class="leaf4" />
      </div>
      <span class="loading" data-name="Loading">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Loading',
    data() {
        return {
            transitionTime: 300,
            blurPixel: 5,
            loading: false,
            text: '加载中...',
            throttle: null
        }
    },
    methods: {
        handleEaseIn() {
            this.$refs.loading.style.display = 'block'
            setTimeout(() => {
                this.$refs.loading.style.backgroundColor = '#ff9235aa'
                let blur = 0
                const timer = setInterval(() => {
                    blur += 1
                    this.$refs.loading.style.backdropFilter = `saturate(200%) blur(${blur}px)`
                    if (blur === this.blurPixel) {
                        clearInterval(timer)
                    }
                }, this.transitionTime / this.blurPixel)
            }, 10)
        },
        handleEaseOut() {
            this.$refs.loading.style.backgroundColor = '#ff923500'
            let blur = this.blurPixel
            const timer = setInterval(() => {
                blur -= 1
                this.$refs.loading.style.backdropFilter = `saturate(200%) blur(${blur}px)`
                if (blur === 0) {
                    clearInterval(timer)
                    this.$refs.loading.style.display = 'none'
                }
            }, this.transitionTime / this.blurPixel)
            setTimeout(() => {
                this.$refs.loading.style.display = 'none'
            }, this.transitionTime)
        },
        show(text, throttle) {
            const throttleTime = throttle || 0
            this.throttle = setTimeout(() => {
                this.loading = true
                this.text = text
                this.handleEaseIn()
            }, throttleTime)
        },
        updateText(text) {
            this.text = text
        },
        finish() {
            clearTimeout(this.throttle)
            this.loading = false
            this.handleEaseOut()
        },
        finishWithFeedback(text) {
            clearTimeout(this.throttle)
            this.updateText(text)
            setTimeout(() => {
                this.loading = false
                this.handleEaseOut()
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
@import './Loading.scss';
</style>
