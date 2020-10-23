'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proyecto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.hasMany(models.Cliente, {
        as: "clientes",
        foreignKey: "proyectoId"
      });

    }
  };
  Proyecto.init({
    name: DataTypes.STRING,
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Proyecto',
    tableName: "proyecto"
  });
  return Proyecto;
};