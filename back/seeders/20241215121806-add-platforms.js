'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "platforms",
      [
        {
          platform: "web",
          nameAr: "Web",
          nameEn: "ويب"
        },
        {
          platform: "app",
          nameAr: "App",
          nameEn: "تطبيق"
        },
        {
          platform: "tv",
          nameAr: "TV",
          nameEn: "تيليفزيون"
        },
        {
          platform: "erp",
          nameAr: "ERP",
          nameEn: "تخطيط موارد المؤسسات"
        },
        
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Revert the seeding by deleting the rows inserted in 'up'
    await queryInterface.bulkDelete('platforms', null, {});
  }
};
