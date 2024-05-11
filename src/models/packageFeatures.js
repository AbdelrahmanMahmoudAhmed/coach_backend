'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PackageFeature extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Package }) {
            // define association here
            this.belongsTo(Package, { foreignKey: 'packageId' })
        }
    }
    PackageFeature.init({

        featureAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        featureEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        packageId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: "package",
                key: "id",
            }
        },
        

    }, {
        sequelize,
        tableName: 'packageFeatures',
        modelName: 'PackageFeature',
    });
    return PackageFeature;
};