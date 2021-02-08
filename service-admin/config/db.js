// 创建mysql的数据库链接

const Sequelize = require('sequelize');
const sequelize = new Sequelize('lzlplatform', 'root', 'lzl123', {
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        //字符集
        charset: 'utf8',
        collate: 'utf8_general_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});

// 测试连接
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = {
    sequelize
};