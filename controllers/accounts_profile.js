const AccountsProfileServices = require('../services/accounts_profile');
const AccountsUploadServices = require('../services/accounts_upload');
const AWS = require('../services/aws');
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

async function upload(req, res, next) {
    try {   
        // Handle the uploaded files
        const files = req.files;

        const accounts_id = req.id;


        const uploaded = await AccountsUploadServices.findAll({ accounts_id });

        const total_photos = +uploaded?.length + +files?.length;

        if(total_photos > 5) {
            return next(new BadRequestError("You can only upload upto 5 photos"))
        }

        for(let file of files) {
            const uploadData = await AWS.upload(file);
            await AccountsUploadServices.create({ filename: uploadData.Location, accounts_id })
        }

        res.status(200).json({ message: 'File upload successful' });
    }catch(err) {
        next(new InternalServerError(err.message))
    }
}


module.exports = {
    create,
    upload
};