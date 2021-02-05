import Index from '@/views/index'
import { UserLayout } from '@/views/template/layouts'

export default [{
    path: '/',
    name: 'index',
    redirect: '/dashboard/workplace',
    component: Index,
    children: [{
        path: 'dashboard/workplace',
        name: 'dashboard',
        component: () =>
            import ('@/views/dashboard/workplace')
    },
    {
        path: 'article/list',
        name: 'article_list',
        component: () =>
            import ('@/views/article/list')
    },
    {
        path: 'article/info',
        name: 'article_info',
        component: () =>
            import ('@/views/article/info')
    }
    ]
}, {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    // hidden: true,
    children: [{
        path: 'login',
        name: 'login',
        component: () =>
            import (/* webpackChunkName: "user" */ '@/views/user/login')
    }]
}]

// {
//     path: '/',
//     component: () => import(/* webpackChunkName: 'root' */ '@/views/index.vue')
// },