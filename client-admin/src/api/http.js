import axios from 'axios'
// import Qs from 'qs'
import router from '@/router/index'
import store from '@/store/index'

const toLogin = () => {
    router.push({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

const api = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT,
    timeout: 10000,
    responseType: 'json'
})

api.interceptors.request.use(
    request => {
        if (request.method == 'post') {
            if (request.data instanceof FormData) {
                if (store.getters['token/isLogin']) {
                    // 如果是 FormData 类型（上传图片）
                    request.data.append('token', store.state.token.token)
                }
            } else {
                // 带上 token
                if (request.data == undefined) {
                    request.data = {}
                }
                if (store.getters['token/isLogin']) {
                    request.data.token = store.state.token.token
                }
                // request.data = Qs.stringify(request.data)
            }
        } else {
            // 带上 token
            if (request.params == undefined) {
                request.params = {}
            }
            if (store.getters['token/isLogin']) {
                request.params.token = store.state.token.token
            }
        }
        return request
    }
)

api.interceptors.response.use(
    response => {
        if (response.data.error != '') {
            // 如果接口请求时发现 token 失效，则立马跳转到登录页
            if (response.data.status == 0) {
                toLogin()
                return false
            }
            // swal({
            // 	icon: 'error',
            // 	title: '系统错误',
            // 	text: response.data.error,
            // 	timer: 2000,
            // 	button: false
            // });
            return Promise.reject(response.data)
        }
        return Promise.resolve(response.data)
    },
    error => {
        return Promise.reject(error)
    }
)

export default api

/** 
 * get方法
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {Object} config 请求的配置
 */
export function get(url, params, config) {
    let time = new Date().getTime()
    return new Promise((resolve, reject) => {
        api.get(`${url}?time=${time}`, {
            params: params,
            config: config
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

/** 
 * post方法
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {Object} config 请求的配置
 */
export function post(url, params, config) {
    console.log(url)
    return new Promise((resolve, reject) => {
        api.post(url, params, config).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

/** 
 * put方法
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {Object} config 请求的配置
 */
export function put(url, params, config) {
    return new Promise((resolve, reject) => {
        api.put(url, params, config).then(res => {
            resolve(res.data, res)
        }).catch(err => {
            reject(err)
        })
    })
}

/** 
 * patch方法
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {Object} config 请求的配置
 */
export function patch(url, params, config) {
    return new Promise((resolve, reject) => {
        api.patch(url, params, config).then(res => {
            resolve(res.data, res)
        }).catch(err => {
            reject(err)
        })
    })
}

/** 
 * delete方法
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {Object} config 请求的配置
 */
export function del(url, params, config) {
    return new Promise((resolve, reject) => {
        api.delete(url, {
            params: params,
            config: config
        }).then(res => {
            resolve(res.data, res)
        }).catch(err => {
            reject(err)
        })
    })
}