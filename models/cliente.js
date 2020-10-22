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
        as: "actividades"
      });

      this.belongsTo(models.TipoCredito, {
        as: "tipoCredito",
        foreignKey: "tipoCreditoId"
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
    regStatus: {
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