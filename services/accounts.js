const Joi = require('joi');
const { Accounts, AccountsProfile, AccountsUpload, sequelize } = require('../models');
const { QueryTypes } = sequelize;

const CreateAccountsSchema = Joi.object({
    name: Joi.string().required()
})

async function create(input) {
    const value = await CreateAccountsSchema.validateAsync(input)   
        
    const results = await Accounts.create(value);

    return results;
}

async function findAll(options) {
    const accounts = await Accounts.findAll({
        ...options,
        include: [{
            model: AccountsProfile, as: 'profile'
        },{
            model: AccountsUpload, as: 'uploads'
        }]
    });
    return accounts;
}


async function findOne(options) {
    const accounts = await Accounts.findOne({
        ...options,
        include: [{
            model: AccountsProfile, as: 'profile'
        },{
            model: AccountsUpload, as: 'uploads'
        }]
    });
    return accounts;
}
module.exports = {
    findAll,
    create,
    findOne
}