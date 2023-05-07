import request from '@/utils/request'

/**
 * 获取学科索引
 * @param indexString 学科索引字符串
 * @returns {AxiosPromise} 响应
 */
export function getIndexByString(indexString) {
    return request.with_json({
        url: '/fileClassification/getIndexByString?indexString=' + indexString,
        method: 'get'
    })
}

/**
 * 获取所有开放栏目
 * @returns {AxiosPromise} 响应
 */
export function getAllOpenTags() {
    return request.with_json({
        url: '/fileClassification/getAllOpenTags',
        method: 'get'
    })
}

/**
 * 获取所有文档类型
 * @returns {AxiosPromise} 响应
 */
export function getAllTypes() {
    return request.with_json({
        url: '/fileClassification/getAllTypes',
        method: 'get'
    })
}

/**
 * 获取所有标签，以及对应的文档数目
 * @param type SUBJECT
 * @param indexString 学科索引字符串
 * @param fileType 文档类型
 * @returns {AxiosPromise} 响应
 */
export function getAllTags(type, indexString, fileType) {
    return request.with_json({
        url: '/fileClassification/getAllTags?type=' + type + '&indexString=' + indexString + '&fileType=' + fileType,
        method: 'get'
    })
}

