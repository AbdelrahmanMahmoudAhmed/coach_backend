'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {

        static associate({ Features , ProjectService}) {
            this.hasMany(Features , { foreignKey : 'serviceId' ,as: 'features'})
            this.hasMany(ProjectService , { foreignKey : 'serviceId',as: 'projects'})
          }
    }
    Service.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },

          nameAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nameEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shortDescAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shortDescEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mainDescAr: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        mainDescEn: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        iconLight: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        iconDark: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isCommingSoon: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
 
    }, {
        sequelize,
        tableName: 'services',
        modelName: 'Service',
        timestamps: true,
    });
    return Service;
};