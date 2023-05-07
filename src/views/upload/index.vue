<template>
  <div class="upload-wrapper">
    <div class="header">
      <div class="upload-description-title">文档上传说明</div>
      <div class="confirm-btn-wrapper">
        <button @click="handleSubmit">确认</button>
      </div>
    </div>
    <div class="body">
      <div class="description-wrapper">
        <div class="title">
          支持的文件类型
        </div>
        <div v-for="item in docTypes" :key="item.type" class="item">
          <div class="type">
            <span>{{ item.type }}</span>
          </div>
          <div class="type-description">
            <span>{{ item.description }}</span>
          </div>
        </div>
      </div>
      <div class="upload-main-wrapper">
        <el-upload
          id="upload-dragger"
          ref="uploader"
          drag
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleFileListChange"
          :on-remove="handleRemove"
          :accept="getAccept()"
        >
          <div class="uploader-inner">
            <div v-if="file === null">
              <div class="tips">
                将文件拖放到此处上传
              </div>
              <button slot="trigger">选择文件</button>
            </div>
            <div v-else>
              <div class="tips">
                当前已选定文件
              </div>
              <div style="color: #ff9235">
                <i class="el-icon-document" />
                <span style="margin-left: .5rem">{{ file.name }}</span>
              </div>
            </div>
          </div>
        </el-upload>
        <div class="input-infos">
          <div class="info-item">
            <div class="title">
              <span>标题</span>
            </div>
            <div>
              <el-input v-model="title" placeholder="文档的标题" />
            </div>
          </div>
          <div class="info-item">
            <div class="title">
              <span>文件描述（文件简介）</span>
            </div>
            <div>
              <el-input v-model="description" placeholder="对文档进行详细的描述和介绍" type="textarea" />
            </div>
          </div>
          <div class="info-item">
            <div class="title">
              <span>学科索引</span>
            </div>
            <div>
              <index-select ref="indexSelect" />
            </div>
          </div>
          <div class="info-item">
            <div class="title">
              <span>文件分类</span>
            </div>
            <div
              v-for="tag in classificationTypes"
              :key="tag.typeName"
              :c-tag-id="tag.id"
              :class="{'basic-tags':true,'answer':tag.typeName === '答案','paper':tag.typeName === '试卷','book':tag.typeName === '参考书','note':tag.typeName === '笔记','course':tag.typeName==='课件','quiz':tag.typeName==='小测验','report':tag.typeName==='实验报告'}"
              @click="handleCTagClick(tag.id)"
            >
              {{ tag.typeName }}
            </div>
          </div>
          <div class="info-item">
            <div class="title">
              <span>标签</span>
            </div>
            <div
              v-for="tag in openTags"
              :key="tag.tagName"
              :op-tag-id="tag.id"
              class="basic-tags"
              @click="handleOPTagClick(tag.id)"
            >
              {{ tag.tagName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docTypes from './doc-types'
import { getAllOpenTags, getAllTypes } from '@/api/file-classification'
import { policy, upload } from '@/api/file-io'
import IndexSelect from '@/views/upload/components/IndexSelect/IndexSelect.vue'

export default {
    name: 'UploadPage',
    components: { IndexSelect },
    data() {
        return {
            docTypes,
            classificationTypes: [],
            openTags: [],
            file: null,
            title: '',
            description: '',
            selectedClassificationTag: null,
            selectedOpenTags: []
        }
    },
    mounted() {
        this.fetchClassificationTypes()
        this.fetchOpenTags()
    },
    methods: {
        fetchClassificationTypes() {
            getAllTypes().then(res => {
                this.classificationTypes = res.data
            })
        },
        fetchOpenTags() {
            getAllOpenTags().then(res => {
                this.openTags = res.data
            })
        },
        getAccept() {
            let accept = ''
            this.docTypes.forEach(type => {
                type.suffix.forEach(s => {
                    accept += `${s},`
                })
            })
            return accept.substring(0, accept.length - 1)
        },
        async getUploadPolicy(fileInfo) {
            const { data } = await policy(fileInfo)
            return data
        },
        handleSubmit() {
            if (
                this.file === null ||
                this.title.trim() === '' ||
                this.description.trim() === '' ||
                this.selectedClassificationTag === null
            ) {
                this.$message.error('请完善所有信息后再确认上传！')
                return
            }
            this.$customLoading.show('处理上传中...')
            const submitFileInfo = {
                fileTitle: this.title,
                fileAbstract: this.description,
                originalName: this.file.name,
                fileType: this.selectedClassificationTag,
                fileIndex: this.$refs.indexSelect.getIndexString(),
                fileTagId: this.getOpenTagsString()
            }
            this.getUploadPolicy(submitFileInfo).then(policy => {
                this.doUpload(submitFileInfo, policy)
            })
        },
        doUpload(info, policy) {
            const uploadPayload = new FormData()
            uploadPayload.append('key', policy.dir + policy.fileNo + info.originalName.substring(info.originalName.lastIndexOf('.')))
            uploadPayload.append('policy', policy.policy)
            uploadPayload.append('Signature', policy.signature)
            uploadPayload.append('OSSAccessKeyId', policy.accessId)
            uploadPayload.append('success_action_status', '200')
            uploadPayload.append('callback', policy.callback)
            // 二进制文件再file.raw的属性中
            uploadPayload.append('file', this.file.raw)
            upload(uploadPayload).then(res => {
                this.$customLoading.finishWithFeedback('上传成功！')
                // 上传成功后清空表单
                this.clearFrom()
            }).catch(() => {
                this.$customLoading.finishWithFeedback('上传失败!网络不畅或文件过大，请重试')
                this.clearFrom()
            })
        },
        handleRemove(file, fileList) {
            this.file = null
        },
        handleFileListChange(file) {
            this.file = file
        },
        handleCTagClick(id) {
            const tags = document.querySelectorAll('[c-tag-id]')
            tags.forEach(tag => {
                if (tag.getAttribute('c-tag-id') === id + '') {
                    if (this.selectedClassificationTag === Number(id)) {
                        tag.classList.remove('active')
                    } else {
                        tag.classList.add('active')
                    }
                } else {
                    tag.classList.remove('active')
                }
            })
            this.selectedClassificationTag = Number(id)
        },
        handleOPTagClick(id) {
            document.querySelector(`.info-item > [op-tag-id="${id}"]`).classList.toggle('active')
            if (this.selectedOpenTags.includes(id)) {
                this.selectedOpenTags = this.selectedOpenTags.filter(item => item !== id)
            } else {
                this.selectedOpenTags.push(Number(id))
            }
        },
        getOpenTagsString() {
            return this.selectedOpenTags.join(',')
        },
        clearFrom() {
            this.file = null
            this.title = ''
            this.description = ''
            this.selectedOpenTags = []
            this.selectedClassificationTag = null
            this.$refs.indexSelect.clear()
            document.querySelectorAll('.info-item > .active').forEach(item => {
                item.classList.remove('active')
            })
        }
    }

}
</script>

<style scoped lang="scss">
@import "./upload";
</style>
