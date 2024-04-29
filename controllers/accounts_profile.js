const AccountsProfileServices = require('../services/accounts_profile');
const AccountsUploadServices = require('../services/accounts_upload');

const Joi = require('joi');
const { BadRequestError, InternalServerError , ValidationError } =  require("../utils/api_errors")
const fs = require('fs');


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

        if(total_photos >= 5) {
            return next(new BadRequestError("You can only upload upto 5 photos"))
        }



        // Process and store the files as required
        // For example, save the files to a specific directory using fs module

        for(let file of files) {
            const filePath = `uploads/${file.filename}`;


            let renameTask = new Promise((resolve, reject) => {
                fs.rename(file.path, filePath, (err) => {
                    if (err) {
                      // Handle error appropriately and send an error response
                      return res.status(500).json({ error: 'Failed to store the file' });
                    }
                    resolve(filePath)
                   
                   
                  });
            })

            await renameTask
            
            await AccountsUploadServices.create({ filename: filePath, accounts_id })
          
        }

        // Send an appropriate response to the client
        res.status(200).json({ message: 'File upload successful' });
    }catch(err) {
        next(new InternalServerError(err.message))
    }
}


module.exports = {
    create,
    upload
};