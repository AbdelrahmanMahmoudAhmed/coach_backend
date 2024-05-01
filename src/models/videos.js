'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Video extends Model {

        static associate() {
            // define association here
        }
    }
    Video.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },

        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptionAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptionEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'videos',
        modelName: 'Video',
    });
    return Video;
};