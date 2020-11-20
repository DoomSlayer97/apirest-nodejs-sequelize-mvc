'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("etapas", [
      
      { name: "Lead", createdAt: new Date(), updatedAt: new Date() },
      { name: "Prospecto", createdAt: new Date(), updatedAt: new Date() },
      { name: "Visita", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
