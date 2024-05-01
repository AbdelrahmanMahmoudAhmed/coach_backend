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
            this.hasMany(ItemOrder, { foreignKey: 'item_id' })
            this.hasOne(Product, { foreignKey: 'item_id' })
            this.hasOne(Package, { foreignKey: 'item_id' })

        }
    }
    Item.init({
        type: {
            type: DataTypes.ENUM('product', 'package'),
            allowNull: false,
        },
        discount_percentage: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
        },
        price: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
        },
        title_ar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title_en: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description_ar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description_en: {
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