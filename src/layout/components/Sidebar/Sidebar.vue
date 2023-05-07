<template>
  <div>
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :unique-opened="false"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo/Logo'
import SidebarItem from './SidebarItem/SidebarItem'
import variables from '@/styles/variables.scss'

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        routes() {
            // 获取所有子路由
            return this.$router.options.routes
        },
        // 设置高亮
        activeMenu() {
            const route = this.$route
            return route.path
        },
        variables() {
            return variables
        },
        isCollapse() {
            return !this.sidebar.opened
        }
    }
}
</script>
