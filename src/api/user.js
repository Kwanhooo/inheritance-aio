import request from '@/utils/request'
import qs from 'qs'

/**
 * 登录请求
 * data: {
 *    username: '',
 *    password: ''
 * }
 * @param data
 */
export function login(data) {
    return request.with_json({
        url: '/account/login',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    })
}

/**
 * 修改密码
 * data:{
 *    newPassword: '',
 *    oldPassword: ''
 * }
 * @param data
 */
export function reset_password(data) {
    return request.with_json({
        url: '/account/reset_password',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    })
}

/**
 * 修改用户信息
 * data: {
 *    name: '',
 *    nickname: ''
 * }
 * @param data
 */
export function update_userinfo(data) {
    return request.with_json({
        url: '/account/update_info',
        method: 'post',
        data: data
    })
}

/**
 * 检查是否登录
 */
export function login_user() {
    return request.with_json({
        url: '/account/login_user',
        method: 'post'
    })
}

/**
 * 退出登录
 */
export function logout() {
    return request.with_json({
        url: '/account/logout',
        method: 'post'
    })
}

