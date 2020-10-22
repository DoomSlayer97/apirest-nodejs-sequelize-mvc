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
      // define association here
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