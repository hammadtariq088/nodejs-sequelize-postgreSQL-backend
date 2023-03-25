"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("People", [
      {
        firstName: "Ahmad",
        lastName: "Tariq",
        email: "ahmad@gmail.com",
        gender: "Male",
        religion: "Islam",
        nationality: "Pakistani",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("People", null, {});
  },
};
