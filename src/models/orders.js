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
        static associate({ ItemOrder,  Client  }) {
            // define association here
            this.belongsTo(Client, { foreignKey: 'clientId' });
            this.hasMany(ItemOrder, { foreignKey: 'orderId' });

        }
    }
    Order.init({
        clientId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            onDelete:'CASCADE',
            onUpdate:'CASCADE',
            references: {
              model: "clients",
              key: "id",
            }
          },

        isPaid:{
            type: DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull: false,
        },
        totalPrice:{
            type: DataTypes.INTEGER,
            defaultValue:0,
            allowNull: false,
        },
        

    }, {
        sequelize,
        tableName: 'orders',
        modelName: 'Order',
    });
    return Order;
};