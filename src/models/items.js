'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Product, Package, ItemOrder }) {
            // define association here
            this.hasMany(ItemOrder, { foreignKey: 'itemId' })
            this.hasOne(Product, { foreignKey: 'itemId' })
            this.hasOne(Package, { foreignKey: 'itemId' })

        }
    }
    Item.init({
        type: {
            type: DataTypes.ENUM('product', 'package'),
            allowNull: false,
        },
        discountPercentage: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
        },
        price: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
        },
        titleAr: {
            type: DataTypes.STRING,
            allowNull: false
        },
        titleEn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descriptionAr: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descriptionEn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        sequelize,
        tableName: 'items',
        modelName: 'Item',
    });
    return Item;
};