<template>
  <div class="doc-cover-wrapper" @click="goDetail">
    <img :src="require(`@/assets/image/cover-${index+1}.png`)" alt="cover" class="cover-background">
    <div class="title">
      <span>{{ doc.fileTitle }}</span>
    </div>
    <div class="under-title">{{ doc.fileTitle }}</div>
  </div>
</template>

<script>
import { checkFilePermission } from '@/api/file-function'
import { purchaseFile } from '@/api/file-function'

export default {
    name: 'DocCover',
    props: {
        doc: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
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
        // getBackground() {
        //     return 'background: url(' + this.doc.previewPicture + ') no-repeat; background-size: cover; font-size: 1rem;'
        // },
        goDetail() {
            checkFilePermission(this.doc.fileNo).then(res => {
                this.$router.push({ path: '/file', query: { fileNo: this.doc.fileNo }})
            }).catch(res => {
                if (res.message === '该文档暂未购买') {
                    this.dialogVisible = true
                }
            })
        },
        // getPrettyTags() {
        //     return this.doc.fileTag.split(',')
        // },
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
@import "DocCover";
</style>
