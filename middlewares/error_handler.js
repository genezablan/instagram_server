const { Request, Response, NextFunction } =  require('express');
const { IsApiError, ApiError } = require('../utils/api_errors');
const currentEnv = process.env.NODE_ENV || 'development';
/**
 * Global error handler for all routes
 * @param {ApiError} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports =  (err, _req, res, next) => {
  if (res.headersSent) return next(err);
  if (IsApiError(err)) return res.status(err.statusCode).send({ error: err.message});
  if (currentEnv === 'development') {
    console.log(err);
    return res.status(500).send({ error: err.message });
  }
  console.log(err);
  return res.status(500).send('Something went wrong');
};