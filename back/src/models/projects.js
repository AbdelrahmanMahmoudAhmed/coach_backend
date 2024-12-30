'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {

        static associate({ ProjectService , ProjectPlatform , Feedback ,Language ,Challenge}) {
            this.hasMany(ProjectService , { foreignKey : 'projectId' ,as: 'services'})
            this.hasMany(ProjectPlatform , { foreignKey : 'projectId' , as: 'platforms'})
            this.hasOne(Feedback , { foreignKey : 'projectId', as: 'feedback'})
            this.hasMany(Language , { foreignKey : 'projectId',as: 'languages'})
            this.hasMany(Challenge , { foreignKey : 'projectId' ,as: 'challenges'})
          }
    }
    Project.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },

          nameAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nameEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shortDescAr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shortDescEn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        longDescAr: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        longDescEn: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        keyObjectivesAr: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        keyObjectivesEn: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        banner: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        serviceImg: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        homeImg: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        previewImg: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        download:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        rating:{
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        displayInHome: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }, 
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'projects',
        modelName: 'Project',
        timestamps: true,
    });
    return Project;
};