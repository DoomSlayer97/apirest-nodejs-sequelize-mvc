'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoCredito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    tableName: "tipocredito",
    modelName: 'TipoCredito',
  });
  return TipoCredito;
};