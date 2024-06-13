'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Token extends Model {

        static associate({ Person }) {
            this.belongsTo(Person, { foreignKey: 'personId' })
        }

    }
    Token.init({


        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        personId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: "items",
                key: "id",
            }
        },

    }, {
        sequelize,
        tableName: 'tokens',
        modelName: 'Token',
    });
    return Token;
};