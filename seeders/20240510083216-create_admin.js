'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

 
     await queryInterface.bulkInsert('persons', [{
      id:1,
      name: 'admin',
      email: "admin@admin.com",
      password:"$2b$12$jK9f529ny3Y.qiNrZ7SJ2uLwHMPoxxvinMaFqFJat4mho/W0bq.qW",
      type:"admin",
      phone:"0101010101010",
      createdAt:"2024-6-1",
      updatedAt:"2024-6-1",
    }], {});
    await queryInterface.bulkInsert('admins', [{
      id:1,
      personId: 1,
      role: "superAdmin",
      createdAt:"2024-6-1",
      updatedAt:"2024-6-1",
      
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
