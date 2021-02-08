const LoginModel = require("../modules/login");
const random = require('string-random')

class loginController {
    /**
     * 用户登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async loginIn(ctx) {
        //接收客服端
        let req = ctx.request.body;
        console.log('req', req)
        if (req.username && req.password) {
            try {
                //使用用户信息查询，且返回token
                const data = await LoginModel.getLoginData({
                    username: req.username,
                    password: req.password
                });
                ctx.response.status = 200;
                if (data.length === 0) {
                    ctx.body = {
                        code: 420,
                        msg: '用户名或密码错误',
                        data
                    }
                } else {
                    ctx.body = {
                        code: 0,
                        msg: '用户登录成功',
                        data,
                        token: random(16)
                    }
                }
            } catch (err) {
                console.log('err', err)
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询用户信息失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }

    /**
     * 用户退出登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async loginOut(ctx) {
        //接收客服端
        try {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '用户退出成功',
                data
            }
        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '数据错误,请联系管理员',
                data: err
            }
        }
    }
}

module.exports = loginController;