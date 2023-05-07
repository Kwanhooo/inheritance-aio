<template>
  <div class="result-card-wrapper">
    <div class="preview-picture" :style="getBackground()" />
    <div class="infos">
      <div class="top">
        <div class="title">
          <span class="title-text" @click="handleGoDetail(doc.fileNo)" v-html="doc.fileTitle" />
          <div
            :class="{'doc-type-tag':true,'answer':doc.fileType === '答案','paper':doc.fileType === '试卷','book':doc.fileType === '参考书','note':doc.fileType === '笔记','course':doc.fileType==='课件','quiz':doc.fileType==='小测验','report':doc.fileType==='实验报告'}"
          >
            <span>{{ doc.fileType }}</span>
          </div>
        </div>
        <div class="date">{{ doc.fileUploadTime }}</div>
      </div>
      <div class="open-tags-wrapper">
        <div
          v-for="(tag,index) in getPrettyTags()"
          :key="index"
          class="open-tag"
        >
          <span>{{ tag }}</span>
        </div>
      </div>
      <div class="description">
        <span v-html="doc.fileAbstract" />
      </div>
      <div class="hit-content">
        <span v-html="doc.hitContent" />
      </div>
    </div>
  </div>
</template>

<script>
import { checkFilePermission } from '@/api/file-function'

export default {
    name: 'ResultCard',
    props: {
        doc: {
            type: Object,
            required: true
        }
    },
    methods: {
        getBackground() {
            return 'background: url(' + this.doc.previewPicture + ') no-repeat; background-size: cover; font-size: 1rem;'
        },
        getPrettyTags() {
            return this.doc.fileTag.split(',')
        },
        handleGoDetail() {
            checkFilePermission(this.doc.fileNo).then(res => {
                this.$router.push({ path: '/file', query: { fileNo: this.doc.fileNo }})
            }).catch(res => {
                if (res.message === '该文档暂未购买') {
                    this.dialogVisible = true
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./ResultCard.scss";
</style>
