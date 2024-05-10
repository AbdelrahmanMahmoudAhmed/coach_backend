'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Admin , Client }) {
      // define association here
      this.hasOne(Admin , { foreignKey : 'personId'})
      this.hasOne(Client , { foreignKey : 'personId'})
    }
    toJSON() {
      // Log a message to indicate that toJSON is being called
      console.log('toJSON method is being called.');
  
      // Exclude the password field from the JSON representation
      const json = { ...this.get() };
      delete json.password;
      return json;
    }
  }
  
  Person.init({

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
    type: {
      type: DataTypes.ENUM('admin', 'client'),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName:'persons',
    modelName: 'Person',
    // defaultScope: {
    //   attributes: { exclude: ['password'] }
    // }
  });
  return Person;
};