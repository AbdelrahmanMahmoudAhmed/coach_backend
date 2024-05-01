'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemOrder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Order, Item }) {
            // define association here
            this.belongsTo(Order, { foreignKey: 'orderId' })
            this.belongsTo(Item, { foreignKey: 'itemId' })

        }
    }
    ItemOrder.init({
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
        itemId: {
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
        tableName: 'itemOrders',
        modelName: 'ItemOrder',
    });
    return ItemOrder;
};