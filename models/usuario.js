'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.hasMany(models.Actividad, {
        as: "actividades",
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
    regStatus: {
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