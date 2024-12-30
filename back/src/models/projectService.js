"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectService extends Model {

    static associate({ Service, Project }) {
        this.belongsTo(Service, { foreignKey: 'serviceId' , as: 'service'  });
        this.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
    }

  }

  ProjectService.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      serviceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "services",
          key: "id",
        },
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
    },
    {
      sequelize,
      tableName: "projectServices",
      modelName: "ProjectService",
      timestamps: true,

    }
  );
  return ProjectService;
};
