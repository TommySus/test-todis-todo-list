'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checklistdata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checklistdata.belongsTo(models.Checklist)
    }
  };
  Checklistdata.init({
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    ChecklistId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Checklistdata',
  });
  return Checklistdata;
};