'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


    await queryInterface.createTable('tokens', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "persons",
          key: "id"
        }
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {


     await queryInterface.dropTable('tokens');

  }
};
