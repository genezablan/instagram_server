'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      // Accounts.hasMany(models.AccountsPrices, {
      //   as: 'accounts_prices',
      //   foreignKey: 'accounts_id'
      // });

      Accounts.hasOne(models.AccountsProfile, {
        as: 'profile',
        foreignKey: 'accounts_id'
      });

      Accounts.hasMany(models.AccountsUpload, {
        as: 'uploads',
        foreignKey: 'accounts_id'
      });
    }
  }
  Accounts.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
    sequelize,
    modelName: 'Accounts',
    tableName: 'accounts',
  });
  return Accounts;
};