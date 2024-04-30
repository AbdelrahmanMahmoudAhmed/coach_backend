'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ ItemOrder, PackageOrders , ProductOrder , ClientOrder }) {
            // define association here
            this.hasMany(ItemOrder, { foreignKey: 'order_id' });
            this.hasMany(ClientOrder , { foreignKey : 'order_id'})
            this.hasOne(PackageOrders, { foreignKey: 'order_id' });
            this.hasOne(ProductOrder, { foreignKey: 'order_id' });
        }
    }
    Order.init({



        type:{
            type: DataTypes.ENUM('product', 'package'),
            allowNull: false,
        },
        is_paid:{
            type: DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull: false,
        }

    }, {
        sequelize,
        tableName: 'orders',
        modelName: 'Order',
    });
    return Order;
};