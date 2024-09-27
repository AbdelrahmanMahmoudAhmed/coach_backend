'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('sections', 'contentAr', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.changeColumn('sections', 'contentEn', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('sections', 'contentAr', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('sections', 'contentEn', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
