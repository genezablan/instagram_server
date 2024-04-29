const AccountsServices = require('../services/accounts')
const Joi = require('joi');
const { BadRequestError, InternalServerError , ValidationError } =  require("../utils/api_errors")

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



module.exports = {
	getAll,
    create,
};