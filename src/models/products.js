'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Item }) {
            // define association here
            this.belongsTo(Item, { foreignKey: 'item_id' })

        }
    }
    Product.init({


        shipping_price: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
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
        tableName: 'products',
        modelName: 'Product',
    });
    return Product;
};