'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Package extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Item , PackageFeature }) {
            // define association here
            this.belongsTo(Item, { foreignKey: 'itemId' })
            this.hasMany(PackageFeature, { foreignKey: 'packageId' })
        }
    }
    
    Package.init({
        period: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        itemId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: "item",
                key: "id",
            }
        },
    }, {
        sequelize,
        tableName: 'packages',
        modelName: 'Package',
    });
    return Package;
};