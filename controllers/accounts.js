const AccountsServices = require('../services/accounts');
const AccountsProfileService = require('../services/accounts_profile');

const Joi = require('joi');
const { BadRequestError, InternalServerError , ValidationError } =  require("../utils/api_errors")

const Jwt = require('jsonwebtoken');

function generateAuthToken({ id, name, accounts_id }) {
    const token = Jwt.sign(
      { id, name, accounts_id },
      process.env.JwtPrivate_Pass,
    );
    return token;
}

async function getAll(req, res) {
    const list = await AccountsServices.findAll();
	res.status(200).json(list);
};

async function create(req, res, next) {
    try {
        const body = req.body;

        const results = await AccountsServices.create(body);

        return res.status(200).send(results);
    }catch(err) {
        console.log('Err:', err?.name);
        if(err instanceof Joi.ValidationError) {
            next(new ValidationError(err.message))
        }else if(err?.name === 'SequelizeUniqueConstraintError') {
            next(new ValidationError())
        }else {
            next(new InternalServerError())
        }
    }
}

async function select(req, res, next) {
    try {
        const name = req.body?.name;

        const results = await AccountsServices.findOne({ name });
        if(!results) {
            return next(new ValidationError('Account do not exists'))
        }

        const accountsProfile = await AccountsProfileService.create({ accounts_id: results.id })

        const token = generateAuthToken( { name: results.name, id: accountsProfile.id , accounts_id: results.id })

        return res.status(200).send({ token });
    }catch(err) {
        console.log('Err:', err);
        if(err instanceof Joi.ValidationError) {
            next(new ValidationError(err.message))
        }else if(err?.name === 'SequelizeUniqueConstraintError') {
            next(new ValidationError())
        }else {
            next(new InternalServerError())
        }
    }
}


async function get_by_id(req, res, next) {
    try {
        const accounts_id = req.params.id;
        console.log('Accounts:', accounts_id);
        
        let data = await AccountsServices.findOne({  id: accounts_id });
        return res.status(200).send(data);
    }catch(err) {
        console.log('Err:', err?.name);
        if(err instanceof Joi.ValidationError) {
            next(new ValidationError(err.message))
        }else if(err?.name === 'SequelizeUniqueConstraintError') {
            next(new ValidationError('Account already exists'))
        }else {
            console.log(err.message)
            next(new InternalServerError())
        }
    }
}

module.exports = {
	getAll,
    create,
    select,
    get_by_id
};