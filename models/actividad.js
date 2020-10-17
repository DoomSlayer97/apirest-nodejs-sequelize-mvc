'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actividad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.Usuario, {
        as: "usuario",
        foreignKey: "usuarioId"
      });

      this.belongsTo(models.Cliente, {
        as: "cliente",
        foreignKey: "clienteId"
      });

    }
  };
  Actividad.init({
    tipo: DataTypes.STRING,
    titulo: {
      type: DataTypes.STRING(50)
    },
    fecha: {
      type: DataTypes.DATEONLY
    },
    fechaFin: {
      type: DataTypes.DATEONLY
    },
    hora: {
      type: DataTypes.STRING
    },
    horaFin: {
      type: DataTypes.STRING
    },
    comentario: {
      type: DataTypes.STRING
    },
    conclusion: {
      type: DataTypes.STRING
    },
    clienteId: {
      type: DataTypes.INTEGER
    },
    usuarioId: {
      type: DataTypes.INTEGER
    },
  }, {
    tableName: "Actividad",
    sequelize,
    modelName: 'Actividad',
  });
  return Actividad;
};