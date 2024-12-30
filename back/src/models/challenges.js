"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {

    static associate({  Project }) {
        this.belongsTo(Project, { foreignKey: 'projectId' });
    }

  }
  Challenge.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      projectId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "projects",
          key: "id",
        },
      },
      nameAr: {
        type: DataTypes.STRING,
        allowNull: false,
        },

        nameEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
      sequelize,
      tableName: "challenges",
      modelName: "Challenge",
      timestamps: true,
    }
  );
  return Challenge;
};
