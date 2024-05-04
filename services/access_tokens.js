const Joi = require('joi');
const { AccessTokens, sequelize } = require('../models');
const { QueryTypes } = sequelize;

const CreateAccessTokensSchema = Joi.object({
    users_id: Joi.number().required(),
    token: Joi.string().required(),
    client_id: Joi.number().required(),
})

const generateTokens = function (data) {
    return crypto.randomBytes(32).toString('hex');
};


async function create(input) {
    const value = await CreateAccessTokensSchema.validateAsync(input)   
        
    const results = await AccessTokens.create(value);

    return results;
}

module.exports = {
    create
}