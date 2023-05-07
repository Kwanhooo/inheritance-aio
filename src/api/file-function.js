import request from '@/utils/request'
import qs from 'qs'

/**
 * 查询是否可以允许访问该文档
 * @param fileId 文件id
 * @returns {AxiosPromise} 响应
 */
export function checkFilePermission(fileId) {
    return request.with_json({
        url: '/fileFunction/checkFilePermission',
        method: 'post',
        data: qs.stringify({
            fileNo: fileId
        })
    })
}

/**
 * 购买文档请求
 * @param fileId 文件id
 * @returns {AxiosPromise} 响应
 */
export function purchaseFile(fileId) {
    return request.with_json({
        url: '/fileFunction/purchaseFile',
        method: 'post',
        data: qs.stringify({
            fileNo: fileId
        })
    })
}

/**
 * 获取文档详情
 * @param fileId 文件id
 * @returns {AxiosPromise} 响应
 */
export function getFileDetail(fileId) {
    return request.with_json({
        url: '/fileFunction/getFileDetail/' + fileId,
        method: 'get'
    })
}
