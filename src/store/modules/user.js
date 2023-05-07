import { login, login_user, logout, reset_password, update_userinfo } from '@/api/user'
import {
    setSessionStorage,
    removeSessionStorage
} from '@/utils/storage'
// import { error } from 'autoprefixer/lib/utils'

// 状态
const state = {}
// 同步方法
const mutations = {}
// 异步方法
const actions = {
    // 登入请求
    async login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                // 将信息保存在内存中
                setSessionStorage('token', data.token)
                setSessionStorage('name', data.userInfo.name)
                setSessionStorage('nickname', data.userInfo.nickname)
                setSessionStorage('user_id', data.userInfo.userId)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 修改密码
    async reset_password({ commit }, passwordChange) {
        return new Promise((resolve, reject) => {
            reset_password({ newPassword: passwordChange.newP, oldPassword: passwordChange.oldP }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 修改用户信息
    async update_userinfo({ commit }, param) {
        return new Promise((resolve, reject) => {
            update_userinfo({ name: param.name, nickname: param.nickname }).then(response => {
                const { data } = response
                setSessionStorage('name', data.name)
                setSessionStorage('nickname', data.nickname)
                setSessionStorage('user_id', data.userId)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    async login_user({ commit }) {
        return new Promise((resolve, reject) => {
            login_user().then(response => {
                const { data } = response
                setSessionStorage('name', data.name)
                setSessionStorage('nickname', data.nickname)
                setSessionStorage('user_id', data.userId)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    async logout({ dispatch }) {
        return new Promise((resolve, reject) => {
            logout().then(response => {
                dispatch('clear_userinfo')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 清空缓存
    async clear_userinfo({ commit }) {
        removeSessionStorage('name')
        removeSessionStorage('nickname')
        removeSessionStorage('user_id')
        removeSessionStorage('token')
    }
}

export default {
    namespaced: true, state, mutations, actions
}

