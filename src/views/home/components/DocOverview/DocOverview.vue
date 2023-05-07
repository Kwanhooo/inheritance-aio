<template>
  <div class="doc-overview-wrapper">
    <div class="preview-picture" :style="getBackground()">
      <div class="gradient">
        <div class="tag-wrapper">
          <div
            v-for="(tag,index) in getPrettyTags()"
            :key="index"
            :class="{tag:true}"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div class="detail-info-wrapper">
      <div class="detail-info-wrapper-inner">
        <div
          :class="{'type-tag':true,'answer':doc.fileType === '答案','paper':doc.fileType === '试卷','book':doc.fileType === '参考书','note':doc.fileType === '笔记','course':doc.fileType==='课件','quiz':doc.fileType==='小测验','report':doc.fileType==='实验报告'}"
        >
          {{ doc.fileType }}
        </div>
        <div class="feature">
          <img class="feature-icon" src="@/assets/svg/eye.svg">
          <span>{{ doc.fileReadTimes }}</span>
        </div>
        <div class="feature">
          <img class="feature-icon" src="@/assets/svg/star.svg">
          <span>{{ doc.fileLikeTimes }}</span>
        </div>
        <div v-if="doc.fileDownloadCoins!==0" class="feature" style="color: gold">
          <img class="feature-icon" src="@/assets/svg/download-paid.svg">
          <span>{{ doc.fileDownloadCoins }}</span><span
            style="margin-left: 1px;margin-bottom: .23rem"
          >积分</span>
        </div>
        <div v-else class="feature" style="color: rgb(20,188,62)">
          <img class="feature-icon" src="@/assets/svg/download-free.svg">
          <span style="margin-left: 1px;margin-bottom: .23rem">免费</span>
        </div>
        <div class="feature overview-date">
          <span>{{ doc.fileUploadTime }}</span>
        </div>
      </div>
    </div>
    <div class="doc-title">{{ doc.fileTitle }}</div>
    <div class="doc-description" :title="doc.fileAbstract">
      {{ doc.fileAbstract }}
    </div>
    <div class="read-more-wrapper">
      <div class="read-more" @click="goDetail()">
        查看详情
      </div>
    </div>
    <!--   无权限查看文件时的弹窗   -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :lock-scroll="false"
    >
      <span>这篇文档还没有购买，是否花费{{ doc.fileDownloadCoins }}积分购买？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="purchase">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { checkFilePermission } from '@/api/file-function'
import { purchaseFile } from '@/api/file-function'

export default {
    name: 'DocOverview',
    props: {
        doc: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            dialogVisible: false,
            downloadFreeIcon: require('@/assets/svg/download-free.svg'),
            downloadPaidIcon: require('@/assets/svg/download-paid.svg')
        }
    },
    mounted() {
    },
    methods: {
        getBackground() {
            return 'background: url(' + this.doc.previewPicture + ') no-repeat; background-size: cover; font-size: 1rem;'
        },
        goDetail() {
            checkFilePermission(this.doc.fileNo).then(res => {
                this.$router.push({ path: '/file', query: { fileNo: this.doc.fileNo }})
            }).catch(res => {
                if (res.message === '该文档暂未购买') {
                    this.dialogVisible = true
                }
            })
        },
        getPrettyTags() {
            return this.doc.fileTag.split(',')
        },
        purchase() {
            purchaseFile(this.doc.fileNo).then(res => {
                this.dialogVisible = false
                this.$message({
                    message: '购买成功！',
                    type: 'success'
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "DocOverview";
</style>
