const Joi = require('joi');
const { AccountsProfile, sequelize } = require('../models');
const { QueryTypes } = sequelize;

const CreateAccountsProfileSchema = Joi.object({
    name: Joi.string(),
    bio: Joi.string(),
    accounts_id: Joi.number(),
    email: Joi.string(),
    location: Joi.string(),
    instagram_id: Joi.string()
})

async function create(input) {
    const value = await CreateAccountsProfileSchema.validateAsync(input)   
        
    const results = await AccountsProfile.create(value);

    return results;
}

async function findOne(options) {
    const accounts = await AccountsProfile.findOne({
        where : { ...options }
    });
    return accounts?.dataValues;
}

async function update(data, condition) {
    // Change everyone without a last name to "Doe"
    return await AccountsProfile.update(
            { ...data },
            {
            where: {
                ...condition
            },
        },
    );
}

module.exports = {
    create,
    findOne,
    update
}