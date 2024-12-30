'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Achievement extends Model {

        static associate() {
        }
    }
    Achievement.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        descAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'achievements',
        modelName: 'Achievement',
        timestamps: true,
    });
    return Achievement;
};