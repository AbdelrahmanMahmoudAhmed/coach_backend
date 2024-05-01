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

          title_ar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title_en: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content_ar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content_en: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('video', 'pic'),
            allowNull: false,
          },



    }, {
        sequelize,
        tableName: 'blogs',
        modelName: 'Blog',
    });
    return Blog;
};