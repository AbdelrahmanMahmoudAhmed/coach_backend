'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('settings', [
      {
        key: "phone",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "email",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "mainDesc",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "footerDesc",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "about",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "policy",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "terms",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "facebook",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "instagram",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "x",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "youtube",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "tiktok",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "keyWords",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },

      {
        key: "title",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },
      {
        key: "description",
        value: "",
        createdAt: "2024-6-1",
        updatedAt: "2024-6-1",
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
