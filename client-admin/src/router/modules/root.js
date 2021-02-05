// import Index from '@/views/index'

export default [{
    path: '/',
    redirect: '/user/login'
}, {
    path: '/user/login',
    name: 'Login',
    component: () =>
        import ('@/views/user/login')
}, {
    path: '/dashboard',
    name: 'Index',
    redirect: '/dashboard/workplace',
    component: () =>
        import ('@/views/index'),
    children: [{
        path: 'dashboard/workplace',
        name: 'Dashboard',
        component: () =>
            import ('@/views/dashboard/workplace')
    }]
}]

// {
//     path: '/',
//     component: () => import(/* webpackChunkName: 'root' */ '@/views/index.vue')
// },