import {get, post } from './http'

export default {
    // 登录
    login: {
        login: val => post('/api/login', val), // 登录
        loginout: val => post('/api/loginout', val) // 退出登录
    },
    // 用户管理
    user: {
        userlist: val => get('/api/user/list', val) // 用户列表
    }
}