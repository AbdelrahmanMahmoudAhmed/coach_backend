'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientOrder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Order, Client }) {
            // define association here
            this.belongsTo(Order, { foreignKey: 'orderId' })
            this.belongsTo(Client, { foreignKey: 'clientId' })
        }
    }
    ClientOrder.init({
        orderId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: "orders",
                key: "id",
            }
        },
        clientId: {
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
        tableName: 'clientOrders',
        modelName: 'ClientOrder',
    });
    return ClientOrder;
};