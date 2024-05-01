'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Certification extends Model {

        static associate() {
            // define association here
        }
    }
    Certification.init({
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
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'certifications',
        modelName: 'Certification',
    });
    return Certification;
};