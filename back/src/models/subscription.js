"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {

    static associate() {

    }

  }
  Subscription.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        },

      
    },
    {
      sequelize,
      tableName: "subscriptions",
      modelName: "Subscription",
      timestamps: true,
    }
  );
  return Subscription;
};
