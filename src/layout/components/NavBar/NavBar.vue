<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div class="right-menu">
      <router-link to="/account" class="link">个人中心</router-link>
      <a href="" target="" class="link">帮助与反馈</a>
      <router-link to="/upload" class="link">上传文档</router-link>
      <el-popover v-model="visible" placement="top" width="250" trigger="click">
        <div>
          <el-input v-model="input" placeholder="请输入关键词" clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch()"
            />
          </el-input>
        </div>
        <el-button slot="reference" icon="el-icon-search" circle />
      </el-popover>
    </div>
    <el-dropdown class="avatar-container">
      <div class="avatar-wrapper">
        <img :src="avatar" class="user-avatar" alt="">
        <font-awesome-icon class="el-icon-caret-bottom" icon="fa-solid fa-chevron-down" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link to="/">
          <el-dropdown-item>
            <span style="padding: 0 .5rem">首页</span>
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click.native="logout">
          <span style="padding: 0 .5rem">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import { Message } from 'element-ui'

export default {
    name: 'Navbar',
    components: {
        Hamburger
    },
    data() {
        return {
            visible: false,
            input: '',
            avatar: require('../../../../public/user.png')
        }
    },
    computed: {
        ...mapGetters(['sidebar'])
    },

    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        async logout() {
            this.$store.dispatch('user/logout').then((res) => {
                Message({
                    message: res.data,
                    type: 'success'
                })
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            }).catch(() => {
                console.log('登出失败')
            })
        },
        handleSearch() {
            this.$router.push({ path: '/search', query: { keywords: this.input }})
            this.visible = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./NavBar.scss";
</style>
