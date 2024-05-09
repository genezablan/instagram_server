const AccountsProfileServices = require('../services/accounts_profile');
const AccountsUploadServices = require('../services/accounts_upload');
const AWS = require('../services/aws');
const Joi = require('joi');
const { BadRequestError, InternalServerError , ValidationError } =  require("../utils/api_errors")

async function create(req, res, next) {
    try {
        let accounts_id = req.id;
        let body = req.body;
        body.accounts_id = accounts_id;
        
        delete body.id

        let data = await AccountsProfileServices.findOne({  accounts_id });
        let results;
        if(!data) {
            results = await AccountsProfileServices.create(body);
        }else {
            results = await AccountsProfileServices.update(body, { accounts_id });
        }

        return res.status(200).send(results);
    }catch(err) {
        console.log('Err:', err?.stack);
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

async function get(req, res, next) {
    try {
        const accounts_profile_id = req.id;
        
        let data = await AccountsProfileServices.findAll({  id: accounts_profile_id });
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

async function get_by_id(req, res, next) {
    try {
        const accounts_profile_id = req.params.id;
        
        let data = await AccountsProfileServices.findOne({  id: accounts_profile_id });
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
        // Handle the uploaded files
        const files = req.files;

        if(!files || files.length <= 0) {
            return next(new BadRequestError("Files are empty"))
        }

        const accounts_profile_id = req.id;

        for(let file of files) {
            const uploadData = await AWS.upload(file);
            await AccountsUploadServices.create({ filename: uploadData.Location, accounts_profile_id })
        }

        res.status(200).json({ message: 'File upload successful' });
    }catch(err) {
        next(new InternalServerError(err.message))
    }
}

async function get_upload(req, res, next) {
    try {   

        const accounts_profile_id = req.id;


        const uploaded = await AccountsUploadServices.findAll({ accounts_profile_id });

        res.status(200).json(uploaded);
    }catch(err) {
        next(new InternalServerError(err.message))
    }
}

async function get_upload_by_id(req, res, next) {
    try {   

        const id = req.params.id;


        const uploaded = await AccountsUploadServices.findOne({ id });

        res.status(200).json(uploaded);
    }catch(err) {
        next(new InternalServerError(err.message))
    }
}

module.exports = {
    create,
    upload,
    get_by_id,
    get_upload,
    get_upload_by_id,
    get
};