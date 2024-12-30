'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
      {
        name: 'admin',
        email: 'admin@admin.com',
        password: '$2b$12$jO9an.CiDXv26LAUh510U.HSvUGPYpTapyXInEHmHFUAYbbxHBdcK', 

      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', { email: 'admin@admin.com' }, {});
  },
};
