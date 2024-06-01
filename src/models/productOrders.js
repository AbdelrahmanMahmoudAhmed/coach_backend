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
        static associate({ ItemOrder }) {
            // define association here
            this.belongsTo(ItemOrder, { foreignKey: 'itemOrderId' })

        }
    }
    ProductOrder.init({

        state: {
            type: DataTypes.ENUM('ordered','prepared', 'shipped' ,'arrived'),
            allowNull: false,
            defaultValue:"ordered"
        },
        itemOrderId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: "itemOrders",
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