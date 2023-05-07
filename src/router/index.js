import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import constantRoutes from './constantRouter'
import getPageTitle from '@/utils/get-page-title'
import { getSessionStorage } from '@/utils/storage'

Vue.use(Router)

const whiteList = ['/login']

const RouterConfig = {
    mode: 'history',
    routes: constantRoutes,
    // 实现查看pdf页面回到顶部
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
}

const router = new Router(RouterConfig)

// 前置守卫
router.beforeEach(async(to, from, next) => {
    document.title = getPageTitle(to.meta.title)
    if (getSessionStorage('token')) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            await store.dispatch('user/clear_userinfo')
            next(`/login?redirect=${to.path}`)
        }
    }
})

export default router