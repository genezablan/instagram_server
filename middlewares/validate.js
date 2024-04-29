/* eslint-disable */
const express = require('express');

const { BadRequestError, InternalServerError , ValidationError , ForbiddenError} =  require("../utils/api_errors")

const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function validateToken(req, res, next) {
    try {
      const token = req.headers['x-token']
      console.log('T:', token);
      const decoded = jwt.verify(token, process.env.JwtPrivate_Pass);
      req.id = decoded.id;
      req.name = decoded.name;
      return next()
    } catch (ex) {
        console.log('EX:', ex);

        return next(new ForbiddenError('You are not allowed to access this API'))
    }
}
module.exports = validateToken

