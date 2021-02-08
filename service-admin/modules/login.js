// 引入mysql的配置文件
const db = require('../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const users = Sequelize.import('../schema/users');
// const users = require('../schema/users')(Sequelize, DataTypes);
// users.sync({ force: false }); //自动创建表

class loginModel {

    /**
     * 查询用户信息
     * @param id 登录信息
     * @returns {Promise<Model>}
     */
    static async getLoginData(params) {
        return await users.findOne({
            where: {
                username: params.username,
                password: params.password
            }
        });
        // if (data) return data.push({ token: random(16) })
        // return null
    }
}

module.exports = loginModel;