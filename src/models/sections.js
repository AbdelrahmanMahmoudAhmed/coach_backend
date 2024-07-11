'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Section extends Model {

        static associate() {
            // define association here
        }
    }
    Section.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        link: {
            type: DataTypes.STRING,
        },
        nameAr: {
            type: DataTypes.STRING,
          
        },
        nameEn: {
            type: DataTypes.STRING,
          
        },
        titleAr: {
            type: DataTypes.STRING,
          
        },
        titleEn: {
            type: DataTypes.STRING,
          
        },
        contentAr: {
            type: DataTypes.STRING,          
        },
        contentEn: {
            type: DataTypes.STRING,
          
        },
        image: {
            type: DataTypes.STRING,
           
        },
        callToAction: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        callToActionLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'sections',
        modelName: 'Section',
    });
    return Section;
};