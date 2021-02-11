// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const websites = Sequelize.import('../schema/website');
websites.sync({ force: false }); //自动创建表

class websiteModel {
    /**
     * 创建用户表模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createWebsite(data) {
        delete data.id
        return await websites.create(data);
    }

    /**
     * 获取用户列表
     * @param data
     * @returns {Promise<Model>}
     */
    static async getWebsiteList() {
        console.log('Modules');
        return await websites.findAll();
    }
}

module.exports = websiteModel;