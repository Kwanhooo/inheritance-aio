<template>
  <h1>
    登录页
  </h1>
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
    created() {
        this.autoLogin()
    },
    methods: {
        autoLogin() {
            this.$store.dispatch('user/login', this.loginForm).then(() => {
                console.log('登录成功')
            }).catch(() => {
                console.error('登录失败')
                this.loading = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'login';
</style>
