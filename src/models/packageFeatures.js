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
            this.belongsTo(Package, { foreignKey: 'package_id' })
        }
    }
    PackageFeature.init({

        feature_ar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        feature_en: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        package_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: "package",
                key: "id",
            }
        },
        

    }, {
        sequelize,
        tableName: 'package_features',
        modelName: 'PackageFeature',
    });
    return PackageFeature;
};