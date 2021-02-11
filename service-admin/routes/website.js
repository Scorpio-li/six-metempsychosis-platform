const router = require('koa-router')()

// 用户控制器
const WebsiteController = require('../controllers/website');

router.prefix('/api/website')

/**
 * 网站相关接口
 */
// 添加网站
router.post('/additem', WebsiteController.create);
// 获取网站列表
router.get('/list', WebsiteController.getList);

module.exports = router