'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Testimonial extends Model {

        static associate() {
            // define association here
        }
    }
    Testimonial.init({
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
            allowNull: false,
        },
        description_en: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'testimonials',
        modelName: 'Testimonial',
    });
    return Testimonial;
};