require('marko/node-require').install();
require('marko/express');


const express  = require('express');
const app = express();
const routes = require('./../app/routes/routes');

//Parameter app to function routes exports
routes(app);




module.exports = app;