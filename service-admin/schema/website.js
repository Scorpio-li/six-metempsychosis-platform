module.exports = function(sequelize, DataTypes) {
    return sequelize.define('websites', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        imgsrc: { // 图片路径
            type: DataTypes.STRING,
            allowNull: false,
            field: 'imgsrc'
        },
        name: { // 网站名称
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name'
        },
        desc: { // 网站简介
            type: DataTypes.STRING,
            allowNull: false,
            field: 'desc'
        },
        address: { // 网站地址
            type: DataTypes.STRING,
            allowNull: false,
            field: 'address'
        },
        type: { // 网站类型
            type: DataTypes.STRING,
            allowNull: false,
            field: 'type'
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