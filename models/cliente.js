'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.hasMany(models.Actividad, {
        as: "actividades",
        foreignKey: "clienteId"
      });

      this.belongsTo(models.Clasificacion, {
        as: "clasificacion",
        foreignKey: "clasificacionId"
      });

      this.belongsTo(models.TipoCredito, {
        as: "tipoCredito",
        foreignKey: "tipoCreditoId"
      });

      this.belongsTo(models.Proyecto, {
        as: "proyecto",
        foreignKey: "proyectoId"
      });

    }
  };
  Cliente.init({
    nombres: DataTypes.STRING,
    apellidoPat: {
      type: DataTypes.STRING
    },
    apellidoMat: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING
    },
    tel: {
      type: DataTypes.STRING
    },
    rfc: {
      type: DataTypes.STRING,
    },
    curp: {
      type: DataTypes.STRING
    },
    fechaNacimiento: {
      type: DataTypes.DATE
    },
    tipoCreditoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proyectoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    clasificacionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    etapaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
  }, {
    tableName: "cliente",
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};