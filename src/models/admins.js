'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Person , Permission}) {
      // define association here
      this.belongsTo(Person , { foreignKey : 'personId'})
      this.hasOne(Permission , { foreignKey : 'adminId'})

    }
  }
  Admin.init({
    personId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique:true,
      onDelete:'CASCADE',
      onUpdate:'CASCADE',
      references: {
        model: "persons",
        key: "id",
      }
    },

    role: {
      type: DataTypes.ENUM('superAdmin', 'admin'),
      allowNull: false,
    },
    allowEdit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    allowDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    websiteManagement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    tableName: 'admins',
    modelName: 'Admin',
  });
  return Admin;
};