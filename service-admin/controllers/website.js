const WebsiteModel = require("../modules/website");

class websiteController {
    /**
     * 创建用户信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        //接收客服端
        let req = ctx.request.body;
        // console.log('req', req)
        if (req.imgsrc && req.name && req.desc && req.address && req.type) {
            try {
                //创建用户信息模型
                const ret = await WebsiteModel.createWebsite(req);
                //使用刚刚创建的用户信息ID查询学生信息详情，且返回学生信息详情信息
                // const data = await WebsiteModel.getUserDetail(ret.id);
                if (ret.id) {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 0,
                        msg: '创建网站信息成功'
                    }
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建网站信息失败',
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
        // if (req.username && req.password) {
        //     try {
        //         //创建用户信息模型
        //         const ret = await WebsiteModel.createWebsite(req);
        //         //使用刚刚创建的用户信息ID查询学生信息详情，且返回学生信息详情信息
        //         const data = await WebsiteModel.getUserDetail(ret.id);

        //         ctx.response.status = 200;
        //         ctx.body = {
        //             code: 200,
        //             msg: '创建用户信息成功',
        //             data
        //         }
        //     } catch (err) {
        //         ctx.response.status = 412;
        //         ctx.body = {
        //             code: 412,
        //             msg: '创建用户信息失败',
        //             data: err
        //         }
        //     }
        // } else {
        //     ctx.response.status = 416;
        //     ctx.body = {
        //         code: 200,
        //         msg: '参数不齐全'
        //     }
        // }
    }

    /**
     * 获取用户列表
     * @param ctx
     * @returns {}
     * */
    static async getList(ctx) {
        console.log('getList, Controller');
        try {
            let data = await WebsiteModel.getWebsiteList();
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
}

module.exports = websiteController;