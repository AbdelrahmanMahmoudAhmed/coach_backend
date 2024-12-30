'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Platforms extends Model {

        static associate({ ProjectPlatform }) {
            this.hasMany(ProjectPlatform, { foreignKey: 'platformId' })
        }
    }
    Platforms.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          platform:{
            type: DataTypes.STRING,
            allowNull: false,
          },

        nameAr: {
        type: DataTypes.STRING,
        allowNull: false,
        },

        nameEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'platforms',
        modelName: 'Platforms',
        timestamps: true,
    });
    return Platforms;
};