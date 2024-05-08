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

function prepareParams(options) {
    let output = {}

    if(options.hasOwnProperty('name')) {
        output.name = options.name
    }
    if(options.hasOwnProperty('bio')) {
        output.bio = options.bio
    }
    if(options.hasOwnProperty('accounts_id')) {
        output.accounts_id = options.accounts_id
    }
    if(options.hasOwnProperty('email')) {
        output.email = options.email
    }
    if(options.hasOwnProperty('location')) {
        output.location = options.location
    }  
    if(options.hasOwnProperty('instagram_id')) {
        output.instagram_id = options.instagram_id
    }
    return output
}

async function create(input) {
    let value = await CreateAccountsProfileSchema.validateAsync(input)   
    value = prepareParams(value);
    const results = await AccountsProfile.create(value);

    return results;
}

async function findOne(options) {
    const accounts = await AccountsProfile.findOne({
        where : { ...options }
    });
    return accounts;
}

async function update(data, condition) {
    data = prepareParams(data);
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