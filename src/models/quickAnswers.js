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
        questionAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        questionEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answerAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answerEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'quickAnswers',
        modelName: 'QuickAnswer',
    });
    return QuickAnswer;
};