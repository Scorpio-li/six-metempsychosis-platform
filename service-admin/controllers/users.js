const UsersModel = require("../modules/users");

class usersController {
    /**
     * 创建用户信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        //接收客服端
        let req = ctx.request.body;
        console.log('req', req, ctx.request)
        if (req.username && req.password) {
            try {
                //创建用户信息模型
                const ret = await UsersModel.createUser(req);
                //使用刚刚创建的用户信息ID查询学生信息详情，且返回学生信息详情信息
                const data = await UsersModel.getUserDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建用户信息成功',
                    data
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建用户信息失败',
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
     * 获取用户列表
     * @param ctx
     * @returns {}
     * */
    static async getList(ctx) {
        console.log('getList, Controller');
        try {
            let data = await UsersModel.getUserList();
            console.log('listdata', data);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }
        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '查询失败',
                data: err
            }
        }
    }

    /**
     * 获取用户详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询学生信息详情模型
                let data = await UsersModel.getUserDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '用户ID必须传'
            }
        }
    }
}

module.exports = usersController;