"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectPlatform extends Model {

    static associate({ Platforms, Project }) {
        this.belongsTo(Platforms, { foreignKey: 'platformId' });
        this.belongsTo(Project, { foreignKey: 'projectId' });
    }

  }
  ProjectPlatform.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      platformId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "platforms",
          key: "id",
        },
        unique: false, 
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
        unique: false, 
      },
    },
    {
      sequelize,
      tableName: "projectPlatforms",
      modelName: "ProjectPlatform",
      timestamps: true,
    }
  );
  return ProjectPlatform;
};
