import request from '@/utils/request'

/**
 * 根据检索条件获取检索文档
 * @param fileTag 专题标签
 * @param fileType 文档类型
 * @param indexString 学科索引字符串
 * @param pageNum 页码
 * @param pageSize 每页大小
 * @param orderBy 排序字段
 * @returns {AxiosPromise} 响应
 */
export function getFilesByCondition(fileTag, fileType, indexString, pageNum, pageSize, orderBy) {
    return request.with_json({
        url: '/fileList/getFilesByCondition?fileTag=' + fileTag + '&fileType=' + fileType + '&indexString=' + indexString + '&pageNum=' + pageNum + '&pageSize=' + pageSize + '&orderBy=' + orderBy,
        method: 'get'
    })
}

/**
 * 根据开放专题获取文档列表
 * @param tag 专题标签
 * @param pageNum 页码
 * @param pageSize 每页大小
 * @returns {AxiosPromise} 响应
 */
export function getFilesByTag(tag, pageNum, pageSize) {
    return request.with_json({
        url: '/fileList/getFilesByTag?tag=' + tag + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        method: 'get'
    })
}

/**
 * 根据关键字搜索
 * @param keyword 关键字
 * @param pageNum 页码
 * @param pageSize 每页大小
 * @returns {AxiosPromise} 响应
 */
export function getFilesByKeyword(keyword, pageNum, pageSize) {
    return request.with_json({
        url: '/fileList/getFilesByKeyword?keyword=' + keyword + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        method: 'get'
    })
}
