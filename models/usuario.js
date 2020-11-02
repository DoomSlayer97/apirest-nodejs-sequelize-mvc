'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {

    static associate(models) {
      
      this.hasMany(models.Actividad, {
        as: "actividades",
        foreignKey: "usuarioId"
      });

    }
  };
  Usuario.init({
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    tableName: "usuario",
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};