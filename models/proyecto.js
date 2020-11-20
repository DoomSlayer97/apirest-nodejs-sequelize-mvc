'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proyecto extends Model {

    static associate(models) {
      
      this.hasMany(models.Cliente, {
        as: "clientes",
        foreignKey: "proyectoId"
      });

    }
  };
  Proyecto.init({
    name: DataTypes.STRING,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Proyecto',
    tableName: "proyecto"
  });
  return Proyecto;
};