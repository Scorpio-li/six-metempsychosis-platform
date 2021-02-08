// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const users = Sequelize.import('../schema/users');
// const users = require('../schema/users')(Sequelize, DataTypes);
users.sync({ force: false }); //自动创建表

class usersModel {
    /**
     * 创建用户表模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createUser(data) {
        return await users.create({
            username: data.username, //姓名
            password: data.password // 密码
        });
    }

    /**
     * 获取用户列表
     * @param data
     * @returns {Promise<Model>}
     */
    static async getUserList() {
        console.log('Modules');
        return await users.findAll();
    }

    /**
     * 查询学生信息的详情
     * @param id 学生信息ID
     * @returns {Promise<Model>}
     */
    static async getUserDetail(id) {
        console.log('id', id)
        return await users.findOne({
            where: {
                id
            }
        });
    }
}

module.exports = usersModel;