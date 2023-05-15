import request from '@/utils/request'
import qs from 'qs'
import axios from 'axios'

// todo: 默认为U盘盘符
const default_dir = 'D:\\'

const arias_conf = {
    'dir': default_dir,
    'pause': false,
    'split': '5',
    'max-connection-per-server': '5',
    'seed-ratio': '0'
}

const arias_query = [
    'status',
    'totalLength',
    'completedLength',
    'downloadSpeed',
    'uploadSpeed',
    'infoHash',
    'numSeeders',
    'files',
    'connections'
]

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

/**
 * 使用aria2直接下载到指定的U盘盘符
 * @param fileLink
 * @returns {AxiosPromise} 响应
 */
export function downloadByAria2(fileLink) {
    return axios({
        url: 'http://localhost:6800/jsonrpc',
        method: 'post',
        data: {
            'jsonrpc': '2.0',
            'method': 'aria2.addUri',
            'id': 1,
            'params': [[fileLink], arias_conf]
        }
    })
}

/**
 * 查询下载状态
 * @param gid
 * @returns {AxiosPromise} 响应
 */
export function checkDownloadStatus(gid) {
    return axios({
        url: 'http://localhost:6800/jsonrpc',
        method: 'post',
        data: {
            'jsonrpc': '2.0',
            'method': 'aria2.tellStatus',
            'id': 1,
            'params': [gid, arias_query]
        }
    })
}
