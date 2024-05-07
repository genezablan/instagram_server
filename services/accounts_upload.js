const Joi = require('joi');
const { AccountsUpload, sequelize } = require('../models');
const { QueryTypes } = sequelize;

const CreateAccountsUploadSchema = Joi.object({
    filename: Joi.string().required(),
    accounts_id: Joi.number().required()
})

async function create(input) {
    const value = await CreateAccountsUploadSchema.validateAsync(input)   
        
    const results = await AccountsUpload.create(value);

    return results;
}

async function findAll(options) {
    const accounts = await AccountsUpload.findAll({
        where : { ...options }
    });
    return accounts;
}


async function findOne(options) {
    const accounts = await AccountsUpload.findOne({
        ...options
    });
    return accounts;
}
module.exports = {
    findAll,
    create,
    findOne
}