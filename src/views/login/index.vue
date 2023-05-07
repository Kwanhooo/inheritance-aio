<template>
  <div class="login-container">
    <i class="backWord">CENTRAL SOUTH UNIVERSITY</i>
    <el-card class="login">
      <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <font-awesome-icon icon="fa-solid fa-user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <font-awesome-icon icon="fa-solid fa-lock" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <font-awesome-icon
              :icon="passwordType === 'password' ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
            />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">进入系统</el-button>
        <a style="color:cornflowerblue" href="#/register">没有账号？点击注册</a>

        <div class="tips">
          <span style="margin-right:20px;">username: {{ loginForm.username }}</span>
          <span> password: {{ loginForm.password }}</span>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: 'zhixiaoxin',
                password: '1234'
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            // 现在验证的东西是没用的
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('user/login', this.loginForm).then(() => {
                        this.$router.push({ path: this.redirect || '/' })
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'login';
</style>
