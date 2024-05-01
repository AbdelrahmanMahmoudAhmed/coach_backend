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
            this.belongsTo(Order, { foreignKey: 'order_id' })
            this.belongsTo(Item, { foreignKey: 'item_id' })

        }
    }
    ItemOrder.init({
        order_id: {
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
        item_id: {
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
        tableName: 'item_orders',
        modelName: 'ItemOrder',
    });
    return ItemOrder;
};