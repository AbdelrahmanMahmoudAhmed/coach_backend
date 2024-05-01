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
            this.belongsTo(Order, { foreignKey: 'orderId' })

        }
    }
    PackageOrder.init({

        state: {
            type: DataTypes.ENUM('ordered','pending', 'ready' ,'started' , 'progress' , 'finished'),
            allowNull: false,
        },
        dietPlanAr: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dietPlanEn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        supplementsAr: {
            type: DataTypes.STRING,
            allowNull: false
        },
        supplementsEn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trainingAr: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trainingEn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: "orders",
                key: "id",
            }
        },

    }, {
        sequelize,
        tableName: 'packageOrders',
        modelName: 'PackageOrder',
    });
    return PackageOrder;
};