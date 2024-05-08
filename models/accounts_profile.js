'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountsProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccountsProfile.belongsTo(models.Accounts, {
        foreignKey: 'accounts_id'
      })
    }
  }
  AccountsProfile.init({
    bio: DataTypes.STRING,
    accounts_id: DataTypes.NUMBER,
    email: DataTypes.STRING,
    location: DataTypes.STRING,
    name: DataTypes.STRING,
    instagram_id: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN,
    approved: DataTypes.BOOLEAN,
    approver_id: DataTypes.NUMBER
  }, {
    underscored: true,
    sequelize,
    modelName: 'AccountsProfile',
    tableName: 'accounts_profile',
  });
  return AccountsProfile;
};