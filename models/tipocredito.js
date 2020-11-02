'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoCredito extends Model {
    
    static associate(models) {
    
      this.hasMany(models.Cliente, {
        as: "clientes",
        foreignKey: "tipoCreditoId"
      });

    }
  };
  TipoCredito.init({
    name: DataTypes.STRING,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TipoCredito',
    tableName: "tipocredito"
  });
  return TipoCredito;
};