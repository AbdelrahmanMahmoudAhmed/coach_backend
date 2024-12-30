'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {

    static associate({ Token }) {
      this.hasOne(Token , { foreignKey : 'adminId'})
    }
    toJSON() {

      const json = { ...this.get() };
      delete json.password;
      return json;
    }
  }
  
  Admin.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName:'admins',
    modelName: 'Admin',
    timestamps: true,

  });
  return Admin;
};