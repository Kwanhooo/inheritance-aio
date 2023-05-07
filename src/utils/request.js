import axios from 'axios'
import { Message } from 'element-ui'
import { getSessionStorage } from '@/utils/storage'
import store from '@/store'

const timeout_limit = 20000

const request_with_json = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    withCredentials: false, // send cookies when cross-domain requests
    timeout: timeout_limit
})

/*
* 请求前预处理配置
* */
const requestOnFulFilledWithJson = config => {
    if (getSessionStorage('token')) {
        config.headers.Authorization = getSessionStorage('token')
    }
    return config
}

const requestOnRejected = error => {
    return Promise.reject(error)
}

/*
* 响应消息处理配置
* */
const onResponseFulfilled = response => {
    const res = response.data
    if (res.code !== 0) {
        Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
        return res
    }
}

const onResponseRejected = error => {
    if (error.response.status && error.response.status === 401) {
        store.dispatch('user/clear_userinfo')
    }
    Message({
        message: error.response.data.message,
        type: 'error',
        duration: 1000
    })
    return Promise.reject(error)
}

request_with_json.interceptors.request.use(requestOnFulFilledWithJson, requestOnRejected)
request_with_json.interceptors.response.use(onResponseFulfilled, onResponseRejected)

const request = {
    with_json: request_with_json
}

export default request
