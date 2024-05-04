'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccessTokens.init({
    users_id: DataTypes.INTEGER,
    client_id: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AccessTokens',
    tableName:'access_tokens'
  });
  return AccessTokens;
};