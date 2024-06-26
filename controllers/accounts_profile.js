const AccountsProfileServices = require('../services/accounts_profile');
const AccountsUploadServices = require('../services/accounts_upload');
const AWS = require('../services/aws');
const Joi = require('joi');
const { BadRequestError, InternalServerError , ValidationError } =  require("../utils/api_errors")

async function create(req, res, next) {
    try {
        const accounts_id = req.id;
        let body = req.body;
        body.accounts_id = accounts_id;
        
        let data = await AccountsProfileServices.findOne({  accounts_id });
        let results;
        if(!data) {
            results = await AccountsProfileServices.create(body);
        }else {
            results = await AccountsProfileServices.update(body, { accounts_id });
        }

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

async function get_by_id(req, res, next) {
    try {
        const accounts_id = req.id;
        
        let data = await AccountsProfileServices.findOne({  accounts_id });
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


async function upload(req, res, next) {
    try {   
        const accounts_id = req.id;


        const uploaded = await AccountsUploadServices.findAll({ accounts_id });
       

        AWS.upload(req, res, async (error) => {
            if(error) {
                return next(new InternalServerError(error.message))
            }

            const files = req.files

            const total_photos = +uploaded?.length + +files?.length;

            if(total_photos > 5) {
                return next(new BadRequestError("You can only upload upto 5 photos"))
            }
            
            

            for(let file of files) {
                await AccountsUploadServices.create({ filename: file.location, accounts_id })
            }

            res.status(200).json({ message: 'File upload successful' });
        })
  


    }catch(err) {
        next(new InternalServerError(err.message))
    }
}

async function get_upload(req, res, next) {
    try {   

        const accounts_id = req.id;


        const uploaded = await AccountsUploadServices.findAll({ accounts_id });

        res.status(200).json(uploaded);
    }catch(err) {
        next(new InternalServerError(err.message))
    }
}


module.exports = {
    create,
    upload,
    get_by_id,
    get_upload
};