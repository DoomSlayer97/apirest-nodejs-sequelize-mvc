'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Actividad', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING(50)
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      fechaFin: {
        type: Sequelize.DATEONLY
      },
      hora: {
        type: Sequelize.STRING(10)
      },
      horaFin: {
        type: Sequelize.STRING(10)
      },
      comentario: {
        type: Sequelize.STRING
      },
      conclusion: {
        type: Sequelize.STRING
      },
      clienteId: {
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: false
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
    await queryInterface.dropTable('Actividad');
  }
};