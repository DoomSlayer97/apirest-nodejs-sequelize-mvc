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
    modelName: 'Etapa',
  });
  return Etapa;
};