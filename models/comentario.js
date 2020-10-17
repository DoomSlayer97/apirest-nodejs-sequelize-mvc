'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.hasMany(models.Comentario, {
        as: "children",
        foreignKey: "parentId"
      });

      this.belongsTo(models.Comentario, {
        as: "parent",
        foreignKey: "parentId"
      });

    }
  };
  Comentario.init({
    texto: DataTypes.STRING,
    usuarioId: {
      type: DataTypes.INTEGER
    },
    clienteId: {
      type: DataTypes.INTEGER
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0 
    }
  }, {
    tableName: "comentario",
    sequelize,
    modelName: 'Comentario',
  });
  return Comentario;
};