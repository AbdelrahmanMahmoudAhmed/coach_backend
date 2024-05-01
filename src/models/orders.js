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
        static associate({ ItemOrder, PackageOrder , ProductOrder , ClientOrder }) {
            // define association here
            this.hasMany(ItemOrder, { foreignKey: 'orderId' });
            this.hasMany(ClientOrder , { foreignKey : 'orderId'})
            this.hasOne(PackageOrder, { foreignKey: 'orderId' });
            this.hasOne(ProductOrder, { foreignKey: 'orderId' });
        }
    }
    Order.init({
        type:{
            type: DataTypes.ENUM('product', 'package'),
            allowNull: false,
        },
        isPaid:{
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