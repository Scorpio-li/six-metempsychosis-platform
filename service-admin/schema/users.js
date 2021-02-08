// 建立与数据表的对应关系，也可以理解为代码的建表

// const moment = require("moment");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // 用户id
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            filed: 'user_id'
                // autoIncrement: true
        },
        // 用户姓名
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'username'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
        },
        // 创建时间
        createAt: {
            type: DataTypes.DATE
        },
        // 更新时间
        updateAt: {
            type: DataTypes.DATE
        }
    }, {
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    });
}