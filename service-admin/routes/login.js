const router = require('koa-router')()

// 用户控制器
const LoginController = require('../controllers/login')

router.prefix('/api/login')

/**
 * 用户接口
 */
// 登录
router.post('/loginin', LoginController.loginIn)
    // 退出登录
router.get('/loginout', LoginController.loginOut)


module.exports = router