"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Person, Order, CartItem, PackageOrder, ProductOrder }) {
      // define association here
      this.belongsTo(Person, { foreignKey: "personId" });
      this.hasMany(Order, { foreignKey: "clientId" });
      this.hasMany(PackageOrder, { foreignKey: "clientId" });
      this.hasMany(ProductOrder, { foreignKey: "clientId" });
      this.hasOne(CartItem, { foreignKey: "clientId" });
    }
  }
  Client.init(
    {
      personId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "persons",
          key: "id",
        },
      },

      goal: {
        type: DataTypes.ENUM(
          "loseFat",
          "loseWeight",
          "gainMuscle",
          "gainWeight",
          "maintain"
        ),
        allowNull: false,
      },
      tall: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      favouriteMeals: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      unFavouriteMeals: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hasDisease:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull: false,
    },
      diseaseType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "clients",
      modelName: "Client",
    }
  );
  return Client;
};
