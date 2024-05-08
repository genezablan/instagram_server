const Joi = require('joi');
const { Users, sequelize } = require('../models');
const crypto = require('crypto');

const CreateUsersSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

function encryptPassword (password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
}

function checkPassword (password, salt, hashed_password) {
    return encryptPassword(password, salt) === hashed_password;
};

async function create(input) {
    let value = await CreateUsersSchema.validateAsync(input)   
      
    const salt = crypto.randomBytes(128).toString('hex');
    const hashed_password = encryptPassword(value.password, salt)

    console.log({
        username: value.username,
        hashed_password,
        salt
    });

    const results = await Users.create({
        username: value.username,
        hashed_password,
        salt
    });

    return results;
}

async function findAll(options) {
    const accounts = await Users.findAll({
        ...options
    });
    return accounts;
}


async function findOne(options) {
    const accounts = await Users.findOne({
        where: { ...options }
    });
    return accounts;
}
module.exports = {
    findAll,
    create,
    findOne,
    checkPassword
}