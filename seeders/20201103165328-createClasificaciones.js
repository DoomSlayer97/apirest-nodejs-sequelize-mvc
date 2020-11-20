'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("clasificacions", [
      { name: "Descartado", etapaId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: "Espera", etapaId: 1 , createdAt: new Date(), updatedAt: new Date() },
      { name: "Cita", etapaId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: "Descartado", etapaId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: "Espera", etapaId: 2 , createdAt: new Date(), updatedAt: new Date() },
      { name: "Cita", etapaId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: "Descartado", etapaId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: "Espera", etapaId: 3 , createdAt: new Date(), updatedAt: new Date() },
      { name: "Cita", etapaId: 3, createdAt: new Date(), updatedAt: new Date() },
    ]);
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
