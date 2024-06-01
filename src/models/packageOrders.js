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
        static associate({ ItemOrder }) {
            // define association here
            this.belongsTo(ItemOrder, { foreignKey: 'itemOrderId' })

        }
    }
    PackageOrder.init({

        state: {
            type: DataTypes.ENUM('ordered','pending', 'ready' ,'started' , 'progress' , 'finished'),
            allowNull: false,
            defaultValue:"ordered"
        },
        dietPlanAr: {
            type: DataTypes.STRING,
            
        },
        dietPlanEn: {
            type: DataTypes.STRING,
            
        },
        supplementsAr: {
            type: DataTypes.STRING,
            
        },
        supplementsEn: {
            type: DataTypes.STRING,
            
        },
        trainingAr: {
            type: DataTypes.STRING,
            
        },
        trainingEn: {
            type: DataTypes.STRING,
            
        },
        itemOrderId: {
            allowNull:false,
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
        tableName: 'packageOrders',
        modelName: 'PackageOrder',
    });
    return PackageOrder;
};