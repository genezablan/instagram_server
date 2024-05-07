'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountsUpload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccountsUpload.init({
    filename: DataTypes.STRING,
    accounts_id: DataTypes.NUMBER,
    type: DataTypes.STRING
  }, {
    underscored: true,
    sequelize,
    modelName: 'AccountsUpload',
    tableName: 'accounts_upload'
  });
  return AccountsUpload;
};