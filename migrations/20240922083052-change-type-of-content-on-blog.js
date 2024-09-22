'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Changing contentAr and contentEn to TEXT
    await queryInterface.changeColumn('blogs', 'contentAr', {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.changeColumn('blogs', 'contentEn', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    // Reverting contentAr and contentEn back to STRING
    await queryInterface.changeColumn('blogs', 'contentAr', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('blogs', 'contentEn', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
