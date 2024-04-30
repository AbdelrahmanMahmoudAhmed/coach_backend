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
            this.belongsTo(Order, { foreignKey: 'order_id' })

        }
    }
    ProductOrder.init({

        state: {
            type: DataTypes.ENUM('ordered','prepared', 'shipped' ,'arrived'),
            allowNull: false,
        },
        order_id: {
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
        tableName: 'product_orders',
        modelName: 'ProductOrder',
    });
    return ProductOrder;
};