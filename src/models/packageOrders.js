'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PackageOrder extends Model {
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
    PackageOrder.init({

        state: {
            type: DataTypes.ENUM('ordered','pending', 'ready' ,'started' , 'progress' , 'finished'),
            allowNull: false,
        },
        diet_plan_ar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        diet_plan_en: {
            type: DataTypes.STRING,
            allowNull: false
        },
        supplements_ar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        supplements_en: {
            type: DataTypes.STRING,
            allowNull: false
        },
        training_ar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        training_en: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: 'package_orders',
        modelName: 'PackageOrder',
    });
    return PackageOrder;
};