import Index from '@/views/index'
import { UserLayout } from '@/views/template/layouts'

// const RouteView = {
//     name: 'RouteView',
//     render: h => h('router-view')
// }

export default [{
    path: '/',
    name: 'index',
    redirect: '/dashboard/workplace',
    meta: { title: '首页' },
    component: Index,
    children: [{
        path: 'dashboard/workplace',
        name: 'dashboard',
        component: () =>
            import ('@/views/dashboard/workplace'),
        meta: { title: '工作台', keepAlive: true }
    }]
}, {
    // 用户管理
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    // hidden: true,
    children: [{
        path: 'login',
        name: 'login',
        component: () =>
            import ('@/views/user/login')
            // meta: { title: '工作台', keepAlive: true }
    }]
}, {
    // 网站管理
    path: '/website',
    component: Index,
    redirect: '/website/list',
    // hidden: true,
    children: [{
        path: 'list',
        name: 'WebsiteList',
        component: () =>
            import ('@/views/website/list'),
        meta: { title: '借鉴网站', keepAlive: true }
    }, {
        path: 'tool',
        name: 'WebsiteTool',
        component: () =>
            import ('@/views/website/tool'),
        meta: { title: '在线工具', keepAlive: true }
    }]
}, {
    // 个人管理
    path: '/account',
    component: Index,
    redirect: '/account/center',
    children: [{
        path: 'center',
        name: 'AccountCenter',
        component: () =>
            import ('@/views/account/center')
    }, {
        path: 'setting',
        name: 'AccountSetting',
        component: () =>
            import ('@/views/account/setting')
    }]
}]