'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clasificacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.Etapa, {
        as: "etapa",
        foreignKey: "etapaId"
      });

    }
  };
  Clasificacion.init({
    name: DataTypes.STRING,
    etapaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
      sequelize,
      tableName: "clasficacion",
      modelName: 'Clasificacion',
  });
  return Clasificacion;
};