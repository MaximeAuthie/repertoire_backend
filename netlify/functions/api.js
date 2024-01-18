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

//! Gérer les routes
app.use('/contacts', cors(generalCorsOptions), checkJwt,contactRouter);
app.use('/categories', cors(generalCorsOptions), checkJwt, categoryRouter);
app.use('/users', cors(generalCorsOptions), userRouter);
app.use('/auth', cors(userCorsOptions), authRouter);

// Export the app and the serverless function

module.exports.handler = serverless(app);

