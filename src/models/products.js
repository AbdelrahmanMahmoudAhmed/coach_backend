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
            this.belongsTo(Item, { foreignKey: 'itemId' })

        }
        
    }
    Product.init({


        shippingPrice: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
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
        tableName: 'products',
        modelName: 'Product',
    });
    return Product;
};