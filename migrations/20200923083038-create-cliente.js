'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cliente', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombres: {
        type: Sequelize.STRING
      },
      apellidoPat: {
        type: Sequelize.STRING
      },
      apellidoMat: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      rfc: {
        type: Sequelize.STRING,
      },
      curp: {
        type: Sequelize.STRING
      },
      fechaNacimiento: {
        type: Sequelize.DATE
      },
      tipoCreditoId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      proyectoId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      etapaId: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('Cliente');
  }
};