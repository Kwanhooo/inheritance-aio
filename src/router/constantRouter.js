import Layout from '@/layout'

const constantRoutes = [
    {
        path: '/login',
        component: Layout,
        redirect: '/login/index',
        children: [
            {
                path: 'index',
                name: '传承中南',
                component: () => import('@/views/login/index'),
                meta: { title: '', icon: 'el-icon-menu' }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/exception/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: '传承中南',
                component: () => import('@/views/home/index'),
                meta: { title: '', icon: 'el-icon-menu' }
            }
        ]
    },

    {
        path: '/search',
        name: '搜索',
        component: Layout,
        redirect: '/search/result',
        children: [
            {
                path: 'result',
                name: '搜索结果',
                component: () => import('@/views/search/index'),
                meta: { title: '', icon: 'el-icon-search' }
            }
        ]
    },
    {
        path: '/account',
        component: Layout,
        redirect: '/account/info',
        name: '账号管理',
        children: [
            {
                path: 'info',
                component: () => import('@/views/account/info/index'), // Parent router-view
                name: '个人信息',
                meta: { title: '', icon: 'el-icon-user-solid' }
            }
        ]
    },
    {
        path: '',
        name: '文档上传',
        redirect: '/upload',
        component: Layout,
        children: [
            {
                path: '/upload',
                name: '文档上传',
                component: () => import('@/views/upload/index'),
                meta: { title: '', icon: 'el-icon-upload' }
            }
        ]
    },
    {
        path: '/file',
        component: () => import('@/views/file/index'),
        hidden: true
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

export default constantRoutes
