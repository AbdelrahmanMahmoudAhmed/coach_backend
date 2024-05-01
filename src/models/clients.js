'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Person , ClientOrder }) {
      // define association here
      this.belongsTo(Person , { foreignKey : 'personId'})
      this.hasMany(ClientOrder , { foreignKey : 'clientId'})
    }
  }
  Client.init({


    goal: {
      type: DataTypes.ENUM('loseFat','loseWeight', 'gainMuscle' , 'gainWeight' , 'maintain' ),
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
  }, {
    sequelize,
    tableName: 'clients',
    modelName: 'Client',
  });
  return Client;
};