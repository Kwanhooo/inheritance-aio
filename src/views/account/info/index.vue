<template>
  <div class="cardContainer">
    <div class="card">
      <!-- <div class="orange" /> -->
      <!-- <div class="topBar">
        <span class="userManage">个人信息</span>
      </div> -->
      <!-- <div class="personal">
        <el-form ref="userinfoForm" :model="userinfoForm" :rules="userinfoRules">
          <span class="logo2">头像昵称</span>
          <hr class="myLine2">
          <div class="img">
            <img alt="" src="">
          </div>
          <div class="six">
            <div style="position:absolute;left:0;top:-30px">
              <el-form-item prop="name">
                <span class="word">真实姓名</span>
                <el-input v-model="userinfoForm.name" class="input2" />
              </el-form-item>
            </div>
            <div class="seven">
              <el-form-item prop="nickname">
                <span class="word">昵称</span>
                <el-input v-model="userinfoForm.nickname" class="input2" />
              </el-form-item>
            </div>
            <div style="position:absolute;left:68px;top:140px">
              <el-button
                type="primary"
                style="background-color:#FF8F1F;border-color: #FF8F1F;"
                @click="updateUserInfo"
              >保存
              </el-button>
            </div>
          </div>
        </el-form>
      </div> -->

      <!-- <div class="account">
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules">
          <span class="logo1">账号密码</span>
          <hr class="myLine">
          <div class="one">
            <span class="word">账号</span>
            <span class="accountNum">{{ user_id }}</span>
          </div>
          <div class="two">
            <el-form-item prop="oldPassword">
              <span class="word">旧密码</span>
              <el-input ref="oldPassword" v-model="passwordForm.oldPassword" class="input" type="password" />
            </el-form-item>
          </div>
          <div class="three">
            <el-form-item prop="newPassword1">
              <span class="word">新密码</span>
              <el-input ref="newPassword1" v-model="passwordForm.newPassword1" class="input" type="password" />
            </el-form-item>
          </div>
          <div class="four">
            <el-form-item prop="newPassword2">
              <span class="word">确认新密码</span>
              <el-input ref="newPassword2" v-model="passwordForm.newPassword2" class="input" type="password" />
            </el-form-item>
          </div>
          <div class="five">
            <el-button
              type="primary"
              style="background-color:#FF8F1F;border-color: #FF8F1F;"
              @click="restPassword"
            >保存
            </el-button>
            <el-button>取消</el-button>
          </div>
        </el-form>
      </div>
      <div class="blue" /> -->

      <div class="left">
        <div class="img">
          在这里修改您的头像...
        </div>
        <div class="nicknameContainer">
          <div class="nickname">昵称</div>
          <div class="nicknameInput">
            <el-form ref="userinfoForm" :model="userinfoForm" :rules="userinfoRules">
              <el-form-item prop="nickname">
                <el-input v-model="userinfoForm.nickname" class="input2" />
              </el-form-item>
              <el-button
                type="primary"
                style="background-color:#FF8F1F;border-color: #FF8F1F;position: absolute;top: 5px;right: 10px;border-radius: 15px;"
                @click="updateUserInfo"
              >ok
              </el-button>
            </el-form>
          </div>
        </div>
      </div>

      <div class="right">
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules">
          <!-- <hr class="myLine"> -->
          <div class="one">
            <span class="word">账号</span>
            <span class="accountNum">{{ user_id }}</span>
          </div>
          <div class="two">
            <span class="word">真实姓名</span>
            <span class="trueName">{{ name }}</span>
          </div>
          <div class="three">
            <el-form-item prop="oldPassword">
              <span class="word2">旧密码</span>
              <el-input ref="oldPassword" v-model="passwordForm.oldPassword" class="input" type="password" :disabled="notEdit" />
            </el-form-item>
          </div>
          <div class="four">
            <el-form-item prop="newPassword1">
              <span class="word2">新密码</span>
              <el-input ref="newPassword1" v-model="passwordForm.newPassword1" class="input" type="password" :disabled="notEdit" />
            </el-form-item>
          </div>
          <div class="five">
            <el-form-item prop="newPassword2 form-item">
              <span class="word2">确认新密码</span>
              <el-input ref="newPassword2" v-model="passwordForm.newPassword2" class="input" type="password" :disabled="notEdit" />
            </el-form-item>
          </div>
          <div class="six">
            <el-button
              type="primary"
              style="background-color:#FF8F1F;border-color: #FF8F1F;"
              @click="restPassword"
            >修改
            </el-button>
            <el-button>取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
import { getSessionStorage } from '@/utils/storage'
import { Message } from 'element-ui'

export default {
    data() {
        const validateEmptyInput = (rule, value, callback) => {
            if (value.length < 1) {
                callback(new Error('输入内容不能为空'))
            } else {
                callback()
            }
        }
        const validateSamePassword = (rule, value, callback) => {
            if (value !== this.passwordForm.newPassword1) {
                callback(new Error('新旧密码不一致'))
            } else {
                callback()
            }
        }
        return {
            user_id: getSessionStorage('user_id'),
            name: getSessionStorage('name'),
            notEdit: true,
            passwordForm: {
                oldPassword: '',
                newPassword1: '',
                newPassword2: ''
            },
            passwordRules: {
                oldPassword: [{ required: true, trigger: 'blur', validator: validateEmptyInput }],
                newPassword1: [{ required: true, trigger: 'blur', validator: validateEmptyInput }],
                newPassword2: [{ required: true, trigger: 'blur', validator: validateSamePassword }]
            },
            userinfoForm: {
                name: '',
                nickname: ''
            },
            userinfoRules: {
                name: [{ required: true, trigger: 'blur', validator: validateEmptyInput }],
                nickname: [{ required: true, trigger: 'blur', validator: validateEmptyInput }]
            }
        }
    },

    created() {
        this.$store.dispatch('user/login_user').then(() => {
            this.userinfoForm.name = getSessionStorage('name')
            this.userinfoForm.nickname = getSessionStorage('nickname')
        })
    },

    methods: {
        restPassword(e) {
            if (e.target.innerText === '修改') {
            // 将上面的三个输入框改成可以输入
                this.notEdit = false
                e.target.innerText = '保存'
            } else {
                this.$refs.passwordForm.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('user/reset_password',
                            {
                                newP: this.passwordForm.newPassword2,
                                oldP: this.passwordForm.oldPassword
                            }
                        ).then((res) => {
                            Message({
                                message: '密码修改成功',
                                type: 'success'
                            })
                        }).catch(error => {
                            Message({
                                message: '修改密码异常' + error,
                                type: 'success'
                            })
                        })
                    } else {
                        return false
                    }
                })

                // 将上面的三个输入框改成不可以输入
                this.notEdit = true
                e.target.innerText = '修改'
            }
        },
        updateUserInfo() {
            this.$refs.userinfoForm.validate(valid => {
                if (valid) {
                    this.$store.dispatch('user/update_userinfo', {
                        // name: this.userinfoForm.name,
                        nickname: this.userinfoForm.nickname
                    }).then((res) => {
                        Message({
                            message: '信息修改成功',
                            type: 'success'
                        })
                    }).catch(error => {
                        Message({
                            message: '修改信息异常' + error,
                            type: 'success'
                        })
                    })
                } else {
                    console.log('error change!!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "myInfo";
</style>
