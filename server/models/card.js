'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Card.belongsTo(models.Board)
      Card.hasMany(models.Checklist)
    }
  };
  Card.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    BoardId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};