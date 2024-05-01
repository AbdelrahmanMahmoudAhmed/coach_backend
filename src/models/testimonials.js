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
        descriptionAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptionEn: {
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