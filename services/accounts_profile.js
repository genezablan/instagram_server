const Joi = require('joi');
const { AccountsProfile, sequelize } = require('../models');
const { QueryTypes } = sequelize;

const CreateAccountsProfileSchema = Joi.object({
    name: Joi.string().required(),
    bio: Joi.string().required(),
    accounts_id: Joi.number().required(),
    email: Joi.string().required(),
    location: Joi.string().required(),
    instagram_id: Joi.string().required()
})

async function create(input) {
    const value = await CreateAccountsProfileSchema.validateAsync(input)   
        
    const results = await AccountsProfile.create(value);

    return results;
}

module.exports = {
    create
}