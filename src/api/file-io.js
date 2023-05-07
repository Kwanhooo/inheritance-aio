import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取上传的凭证policy
 * @param fileInfo
 * @returns {AxiosPromise} 上传凭证
 */
export function policy(fileInfo) {
    return request.with_json({
        url: '/fileIO/policy',
        method: 'post',
        data: fileInfo
    })
}

/**
 * 前端上传文件接口（OSS直传）
 * @param payload
 * @returns {AxiosPromise} 上传结果
 */
export function upload(payload) {
    return request.with_json({
        url: 'https://csu-inheritance.oss-cn-shanghai.aliyuncs.com',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: payload
    })
}
