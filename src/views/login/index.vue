<template>
  <div class="wrapper">
    <div class="slogan">
      知新馆宝藏学习资料库
    </div>
    <div class="search-wrapper">
      <input
        v-model="keywords"
        type="search"
        placeholder="查找需要的资料..."
        class="search-input"
        @keydown.enter="handleSearch"
      >
      <button class="search-btn" @click="handleSearch">
        🔍 搜索
      </button>
    </div>
    <div class="catalog-wrapper">
      <div class="row">
        <div class="item" @click="handleRedirect('/classification?type=SUBJECT')">
          <div class="icon-wrapper">
            <img class="icon" src="@/assets/svg/book.svg">
          </div>
          <div class="text">课程科目类</div>
        </div>
        <div class="item" @click="handleRedirect('/classification?type=COLUMN')">
          <div class="icon-wrapper">
            <img class="icon" src="@/assets/svg/blackboard.svg">
          </div>
          <div class="text">学业规划类</div>
        </div>
      </div>
      <div class="row">
        <div class="item" @click="handleRedirect('/outline?type=SYSTEM')">
          <div class="icon-wrapper">
            <img class="icon" src="@/assets/svg/system.svg">
          </div>
          <div class="text">系统介绍</div>
        </div>
        <div class="item" @click="handleRedirect('/outline?type=GUIDE')">
          <div class="icon-wrapper"><img class="icon" src="@/assets/svg/guide.svg"></div>
          <div class="text">使用指南</div>
        </div>
      </div>
    </div>
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
            // loading: false,
            // passwordType: 'password',
            // redirect: undefined
            keywords: ''
        }
    },
    // watch: {
    //     $route: {
    //         handler: function(route) {
    //             this.redirect = route.query && route.query.redirect
    //         },
    //         immediate: true
    //     }
    // },
    created() {
        this.autoLogin()
    },
    methods: {
        autoLogin() {
            sessionStorage.getItem('token') || this.handleLogin()
        },
        handleLogin() {
            this.$store.dispatch('user/login', this.loginForm).then(() => {
                console.log('登录成功')
            }).catch(() => {
                console.error('登录失败')
                this.loading = false
            })
        },
        handleRedirect(route) {
            this.$router.push(route)
        },
        handleSearch() {
            console.log(this.keywords)
            this.$router.push({ path: '/search', query: { keywords: this.keywords }})
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'login';

</style>
