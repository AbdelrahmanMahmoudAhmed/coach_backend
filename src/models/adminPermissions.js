'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Admin  }) {
            // define association here
            this.belongsTo(Admin, { foreignKey: 'admin_id' })

        }
    }
    Permission.init({
        admin_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique:true,
            onDelete:'CASCADE',
            onUpdate:'CASCADE',
            references: {
              model: "admins",
              key: "id",
            }
          },
        allow_edit: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        allow_delete: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        allow_manage_website: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },

    }, {
        sequelize,
        tableName: 'permissions',
        modelName: 'Permission',
    });
    return Permission;
};