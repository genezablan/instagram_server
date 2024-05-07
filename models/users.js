'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    username: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    salt: DataTypes.STRING,
    roles: DataTypes.ARRAY(DataTypes.JSON)
  }, {
    underscored: true,
    sequelize,
    modelName: 'Users',
    tableName: 'users'
  });

  return Users;
};