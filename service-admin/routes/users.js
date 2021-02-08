const router = require('koa-router')()

// 用户控制器
const UsersController = require('../controllers/users');

router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

/**
 * 用户接口
 */
console.log('router');

// 创建用户
router.post('/user/create', UsersController.create);
// 获取用户列表
router.get('/user/list', UsersController.getList);
// 获取用户详情
router.get('/user/:id', UsersController.detail);

module.exports = router