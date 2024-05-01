'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductOrder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Order }) {
            // define association here
            this.belongsTo(Order, { foreignKey: 'orderId' })

        }
    }
    ProductOrder.init({

        state: {
            type: DataTypes.ENUM('ordered','prepared', 'shipped' ,'arrived'),
            allowNull: false,
        },
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

    }, {
        sequelize,
        tableName: 'productOrders',
        modelName: 'ProductOrder',
    });
    return ProductOrder;
};