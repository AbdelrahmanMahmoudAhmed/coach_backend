'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Features extends Model {

        static associate({ Service }) {
            this.belongsTo(Service, { foreignKey: 'serviceId' })
        }
    }
    Features.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },

          serviceId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: "services",
                key: "id",
            }
        },
        nameAr: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        nameEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
  
 
    }, {
        sequelize,
        tableName: 'features',
        modelName: 'Features',
        timestamps: true,
    });
    return Features;
};