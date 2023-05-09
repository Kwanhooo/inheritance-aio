<template>
  <div class="file">
    <div class="header">
      <div id="box1">
        <div id="box1-1">
          <img src="@/assets/svg/back.svg" alt="back" @click="$router.go(-1)">
        </div>
        <div id="box1-2">
          <div id="box1-2-1">
            <div
              :class="{'type-tag':true,'answer':file.fileType === '答案',
                       'paper':file.fileType === '试卷','book':file.fileType === '参考书','note':file.fileType === '笔记',
                       'course':file.fileType==='课件','quiz':file.fileType==='小测验','report':file.fileType==='实验报告'}"
            >
              {{ file.fileType }}
            </div>
            <div class="fileTitle">{{ file.fileTitle }}</div>
          </div>
          <div id="box1-2-2">
            <div v-for="fileTag in file.fileTags" :key="fileTag" class="tag">{{ fileTag }}</div>
          </div>
        </div>
      </div>
      <div id="box2">
        <div id="box2-1">
          <img src="@/assets/svg/good.svg" alt="good">
          <span><font color="#f64f5d" size="5px">{{ file.fileLikeTimes }}</font></span>
          <img src="@/assets/svg/star.svg" alt="star">
          <span><font color="#dca263" size="5px">{{ file.fileCollectTimes }}</font></span>
          <img src="@/assets/svg/download.svg" alt="download">
          <span><font color="#68c23a" size="5px">{{ file.fileDownloadTimes }}</font></span>
        </div>
        <div id="box2-2">
          <div class="fileUploaderNickname">上传者：{{ file.fileUploaderNickname }} ｜</div>
          <div class="fileUploadTime">上传日期：{{ file.fileUploadTime }}｜</div>
          <img src="@/assets/svg/eye.svg" alt="eye">
          <div class="fileReadTimes">{{ file.fileReadTimes }}</div>
        </div>
      </div>
    </div>
    <div class="content">
      <iframe
        v-if="!loading"
        :src="`/pdfjs-2.7.570-es5-dist/web/viewer.html?file=` + file.previewPdf"
      />
    </div>
  </div>
</template>

<script>
import { getFileDetail } from '@/api/file-function'

export default {
    data() {
        return {
            file: {},
            loading: true
        }
    },
    mounted() {
        getFileDetail(this.$route.query.fileNo).then(res => {
            this.file = res.data
            this.file.fileTags = this.file.fileTag.split(',')
            this.file.previewPdf = encodeURIComponent(this.file.previewPdf)
            this.loading = false
        })
    }
}
</script>

<style lang="scss" scoped>
@import "file";
</style>
