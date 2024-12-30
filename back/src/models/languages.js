'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Language extends Model {

        static associate({ Project }) {
            this.belongsTo(Project, { foreignKey: 'projectId' })
        }
    }
    Language.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
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
    }, {
        sequelize,
        tableName: 'languages',
        modelName: 'Language',
        timestamps: true,
    });
    return Language;
};