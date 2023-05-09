<template>
  <div>
    <div class="top-bar">
      <div v-if="type === 'SUBJECT'" class="class-title">
        <img class="title-icon" src="@/assets/svg/book.svg">
        <div class="title-text">课程科目类</div>
      </div>
      <div v-else-if="type === 'COLUMN'" class="class-title">
        <img class="title-icon" src="@/assets/svg/book.svg">
        <div class="title-text">学科规划类</div>
      </div>
      <div class="back-wrapper" @click="$router.back()">
        <img class="icon" src="@/assets/svg/home.svg" alt="home">
        <div class="text">返回上一页</div>
      </div>
    </div>

    <div class="class-content">
      <div
        v-for="item in classes"
        :key="item.id"
        class="item"
      >
        <font-awesome-icon class="content-icon" icon="fa-regular fa-file-lines" />
        <div class="content-wrapper">
          <div class="content-text">{{ item.tagName }}</div>
          <div class="content-describe">{{ item.describe }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllTags } from '@/api/file-classification'

export default {
    name: 'Classification',
    data() {
        return {
            type: '',
            classes: []
        }
    },
    mounted() {
        const type = this.$route.query.type
        this.type = type
        this.getTagsByType(type)
    },
    methods: {
        getTagsByType(type) {
            getAllTags(type, '', '').then(res => {
                this.classes = res.data
                console.log(res.data)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "classification.scss";
</style>
