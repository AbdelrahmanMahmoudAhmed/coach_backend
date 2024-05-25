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
        static associate({ Order, Item ,PackageOrder , ProductOrder}) {
            // define association here
            this.belongsTo(Order, { foreignKey: 'orderId' });
            this.belongsTo(Item, { foreignKey: 'itemId' });
            this.hasOne(PackageOrder, { foreignKey: 'itemOrderId' });
            this.hasOne(ProductOrder, { foreignKey: 'itemOrderId' });

        }
    }
    ItemOrder.init({
        orderId: {
            allowNull: false,
            type: DataTypes.INTEGER,
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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: "items",
                key: "id",
            }
        },
                type:{
            type: DataTypes.ENUM('product', 'package'),
            allowNull: false,
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
    }, {
        sequelize,
        tableName: 'itemOrders',
        modelName: 'ItemOrder',
    });
    return ItemOrder;
};