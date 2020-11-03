'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etapa extends Model {

    static associate(models) {
      
      this.hasMany(models.Clasificacion, {
        as: "clasificaciones",
        foreignKey: "etapaId"
      });

      this.hasMany(models.Cliente, {
        as: "clientes",
        foreignKey: "etapaId"
      });

    }
  };
  Etapa.init({
    name: DataTypes.STRING,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
      sequelize,
      tableName: "etapas",
      modelName: 'Etapa',
  });
  return Etapa;
};