const Joi = require('joi');
const { Accounts, sequelize } = require('../models');
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
        ...options
    });
    return accounts;
}


async function findOne(options) {
    const accounts = await Accounts.findOne({
        ...options
    });
    return accounts;
}
module.exports = {
    findAll,
    create,
    findOne
}