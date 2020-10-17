'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comentarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      texto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      usuarioId: {
        type: Sequelize.INTEGER
      },
      clienteId: {
        type: Sequelize.INTEGER
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comentarios');
  }
};