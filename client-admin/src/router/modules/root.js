export default [{
    path: '/',
    name: 'Login',
    component: () =>
        import ('@/views/user/login.vue')
}]

// {
//     path: '/',
//     component: () => import(/* webpackChunkName: 'root' */ '@/views/index.vue')
// },