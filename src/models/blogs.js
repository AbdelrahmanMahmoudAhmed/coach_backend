'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {

        static associate() {
            // define association here
        }
    }
    Blog.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },

          titleAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        titleEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contentAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contentEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM('video', 'pic','text'),
            allowNull: false,
          },
    }, {
        sequelize,
        tableName: 'blogs',
        modelName: 'Blog',
    });
    return Blog;
};