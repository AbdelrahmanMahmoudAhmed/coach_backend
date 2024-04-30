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
      this.belongsTo(Person , { foreignKey : 'person_id'})
      this.hasOne(Permission , { foreignKey : 'admin_id'})

    }
  }
  Admin.init({


    role: {
      type: DataTypes.ENUM('super_admin', 'admin'),
      allowNull: false,
    },

  }, {
    sequelize,
    tableName: 'admins',
    modelName: 'Admin',
  });
  return Admin;
};