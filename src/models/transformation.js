'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transformation extends Model {

        static associate() {
            // define association here
        }
    }
    Transformation.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },

        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description_ar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description_en: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'transformations',
        modelName: 'Transformation',
    });
    return Transformation;
};