"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate({ Project }) {

      this.belongsTo(Project, { foreignKey: 'projectId' });
  }
  }
  Feedback.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      projectId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "projects",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "feedbacks",
      modelName: "Feedback",
      timestamps: true,
    }
  );
  return Feedback;
};
