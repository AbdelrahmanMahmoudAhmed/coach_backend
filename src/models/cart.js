'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Client , CartItem }) {
      // define association here
      this.belongsTo(Client , { foreignKey : 'clientId'});
      this.hasMany(CartItem , { foreignKey : 'cartId'});
    }
  }
  Cart.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    clientId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique:true,
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        references: {
          model: "clients",
          key: "id",
        }
      },


  }, {
    sequelize,
    tableName: 'carts',
    modelName: 'Cart',
  });
  return Cart;
};