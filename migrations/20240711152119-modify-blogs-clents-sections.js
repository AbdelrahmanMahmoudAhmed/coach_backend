'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('blogs', 'type', {
      type: Sequelize.ENUM('video', 'pic', 'text'),
      allowNull: false,
    });

    await queryInterface.addColumn('sections', 'callToActionLink', {
      type: Sequelize.STRING,
      allowNull: true,
    });


    await queryInterface.addColumn('clients', 'country', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('clients', 'favouriteMeals', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('clients', 'unFavouriteMeals', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('clients', 'hasDisease', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue:false,
    });
    await queryInterface.addColumn('clients', 'diseaseType', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('blogs', 'type', {
      type: Sequelize.ENUM('video', 'pic'),
      allowNull: false,
    });

    await queryInterface.removeColumn('sections', 'callToActionLink');

    await queryInterface.removeColumn('clients', 'country');
    await queryInterface.removeColumn('clients', 'favouriteMeals');
    await queryInterface.removeColumn('clients', 'unFavouriteMeals');
    await queryInterface.removeColumn('clients', 'hasDisease');
    await queryInterface.removeColumn('clients', 'diseaseType');

  }
};
