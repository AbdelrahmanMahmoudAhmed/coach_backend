'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QuickAnswer extends Model {

        static associate() {
            // define association here
        }
    }
    QuickAnswer.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        question_ar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        question_en: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer_ar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer_en: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'quick_answers',
        modelName: 'QuickAnswer',
    });
    return QuickAnswer;
};