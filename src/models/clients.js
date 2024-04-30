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
      this.belongsTo(Person , { foreignKey : 'person_id'})
      this.hasMany(ClientOrder , { foreignKey : 'client_id'})

    }
  }
  Client.init({


    goal: {
      type: DataTypes.ENUM('lose_fat','lose_weight', 'gain_muscle' , 'gain_weight' , 'maintain' ),
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