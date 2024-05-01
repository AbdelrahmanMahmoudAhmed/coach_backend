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