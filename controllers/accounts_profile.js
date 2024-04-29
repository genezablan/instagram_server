const AccountsProfileServices = require('../services/accounts_profile')
const Joi = require('joi');
const { BadRequestError, InternalServerError , ValidationError } =  require("../utils/api_errors")

async function create(req, res, next) {
    try {
        const body = req.body;

        const results = await AccountsProfileServices.create(body);

        return res.status(200).send(results);
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
    create,
};