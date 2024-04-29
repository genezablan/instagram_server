const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const logger = require('morgan')
const globalErrorHandler = require("../middlewares/error_handler");

const v1Route = require('../routes/v1/')

let server;

const expressService = {
    init: async () => {
      try {
        /*
          Loading routes automatically
        */
        server = express();
        server.use(logger('dev'));
        server.use(bodyParser.json());
        server.use(`/v1/`, v1Route)
        server.use(globalErrorHandler);
        server.listen(process.env.SERVER_PORT);
        console.log("[EXPRESS] Express initialized");
      } catch (error) {
        console.log("[EXPRESS] Error during express service initialization");
        throw error;
      }
    },
  };
  
module.exports = expressService;