'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Settings extends Model {

        static associate() {
            // define association here
        }
    }
    Settings.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },

        key: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {
        sequelize,
        tableName: 'settings',
        modelName: 'Settings',
    });
    return Settings;
};