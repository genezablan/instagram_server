
const Joi = require('joi');
const { BadRequestError, InternalServerError , ValidationError } =  require("../utils/api_errors")
const AccountsProfileService = require('../services/accounts_profile')
const jwt = require('jsonwebtoken');

const ValidateApproveSchema = Joi.object({
    accounts_id: Joi.number().required()
})

async function approve(req, res, next) {
    try {
        const body = req.body;

        const { accounts_id } = await ValidateApproveSchema.validateAsync(body);
        
        const accountsProfileData = await AccountsProfileService.findOne({ accounts_id });

        console.log('accountsProfileData:' , accountsProfileData);

        if(!accountsProfileData) {
            return next(new BadRequestError('Accounts profile do not exists'))
        }

        if(accountsProfileData.approved) {
            return res.status(200).send({ message: 'Successfully approved '}); 
        }
        const approver_id = req.user.id;

        await AccountsProfileService.update( { approver_id, approved: true } , { accounts_id })


        return res.status(200).send({ message: 'Successfully approved '}); 
    }catch(err) {
        console.log('Err:', err?.stack);
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
    approve
};