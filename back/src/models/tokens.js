'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Token extends Model {

        static associate({ Admin }) {
            this.belongsTo(Admin, { foreignKey: 'adminId' })
        }

    }
    Token.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },

        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        adminId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: "admins",
                key: "id",
            }
        },

    }, {
        sequelize,
        tableName: 'tokens',
        modelName: 'Token',
        timestamps: true,
    });
    return Token;
};