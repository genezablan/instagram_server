const UsersService = require('../services/users')
const Joi = require('joi');
const { BadRequestError, InternalServerError , ValidationError } =  require("../utils/api_errors")

const jwt = require('jsonwebtoken');

const ValidateLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

async function create(req, res, next) {
    try {
        const body = req.body;

        const results = await UsersService.create(body);

        return res.status(200).send(results);
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

async function login(req, res, next) {
    try {
        const { username, password }  = await ValidateLoginSchema.validateAsync(req.body);

        const user = await UsersService.findOne({ username })
        //No user found
        if (!user) {
            return next(new BadRequestError("Invalid user"))
        }
    
        console.log('user:', user);
    
        //Incorrect password
        if (!UsersService.checkPassword(password, user.salt, user.hashed_password)) {
            return next(new BadRequestError("Incorrect password"))
        }
    
        const payload = {
            username: user.username,
            id: user.id
        }
    
        const token = jwt.sign(payload, process.env.JwtPrivate_Pass, { expiresIn: "1d" })
    
        return res.status(200).send({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token
        })
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
    create,
    login
};