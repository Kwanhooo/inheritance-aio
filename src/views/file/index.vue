<!-- <template>
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
</template> -->

<template>
  <div>
    <div class="top-bar">
      <div class="back-wrapper" @click="$router.back()">
        <img class="icon" src="@/assets/svg/back.svg" alt="back">
        <div class="text">返回</div>
      </div>
      <div class="download-wrapper">
        <img class="icon" src="@/assets/svg/download.svg" alt="download">
        <div class="text" @click="createQRCode">下载</div>
      </div>
    </div>

    <div class="file-wrapper">
      <div class="file-title">
        <div class="title-text">{{ file.fileTitle }}</div></div>
      <div class="file-content">
        <iframe
          v-if="!loading"
          :src="`/pdfjs-2.7.570-es5-dist/web/viewer.html?file=` + file.previewPdf"
        />
      </div>
    </div>

    <el-dialog title="下载方式" :visible.sync="dialogVisible" class="download-box">
      <div class="download-code">
        <div ref="qrcode" class="qrcode" />
        <div class="text">请使用浏览器进行下载</div>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { getFileDetail } from '@/api/file-function'
import QRCode from 'qrcodejs2'

export default {
    data() {
        return {
            file: {},
            loading: true,
            qrcode: null,
            dialogVisible: false
        }
    },
    mounted() {
        this.refreshFileInfo()
    },
    methods: {
        refreshFileInfo() {
            getFileDetail(this.$route.query.fileNo).then(res => {
                this.file = res.data
                this.file.fileTags = this.file.fileTag.split(',')
                this.file.previewPdf = encodeURIComponent(this.file.previewPdf)
                this.loading = false
            })
        },
        // 生成二维码
        createQRCode() {
            this.dialogVisible = true
            getFileDetail(this.$route.query.fileNo).then(res => {
                if (this.qrcode) {
                    this.$refs.qrcode.innerHTML = ''
                }
                this.$nextTick(() => {
                    const url = decodeURIComponent(res.data.previewPdf)
                    this.qrcode = new QRCode(this.$refs.qrcode, {
                        text: url,
                        correctLevel: 3
                    })
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "file";
</style>
