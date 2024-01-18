//! Importer les routeurs
const contactRouter = require('../../routes/contact.routes');
const categoryRouter = require('../../routes/category.routes');
const userRouter = require('../../routes/user.routes');
const authRouter = require('../../routes/auth.routes');

//! Importer le middleware "checkJwt"
const checkJwt = require('../../middlewares/jwtCheck');

//! Importer Express
const express = require('express');

//! Importer "serverless-http"
const serverless = require("serverless-http");

//! Importer la dépendance "cors" et les options
const cors = require('cors');
const {generalCorsOptions, userCorsOptions} = require('../../cors/corsOptions');

//! Importer la dépendance Dotenv pour gérer les variables d'environnement
require('dotenv').config();

//! Importer la dépendance http-status-codes pour gérer les codes HTTP
const { StatusCodes } = require('http-status-codes');

//! Créer l'app
const app = express();

//! Importer et paramétrer le package body-parser
// const bodyParser = require('body-parser');
// // app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

//! Gérer les routes
app.use('/api/contacts', cors(generalCorsOptions), checkJwt,contactRouter);
app.use('/api/categories', cors(generalCorsOptions), checkJwt, categoryRouter);
app.use('/api/users', cors(generalCorsOptions), userRouter);
app.use('/api/auth', cors(userCorsOptions), authRouter);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);

