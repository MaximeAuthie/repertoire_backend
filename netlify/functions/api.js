//! Importer les routeurs
const contactRouter = require('../../routes/contact.routes');
const categoryRouter = require('../../routes/category.routes');
const userRouter = require('../../routes/user.routes');
const authRouter = require('../../routes/auth.routes');

//! Importer le middleware "checkJwt"
const checkJwt = require('../../middlewares/jwtCheck');

//! Importer Express
const express = require('express');

//! Importer Mongoose
const mongoose = require('mongoose');

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
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//! Connecter la BDD
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('Database connected'))
    .catch((error) => console.error(error));

//! Gérer les routes
app.use('/api/contacts', cors(generalCorsOptions), checkJwt,contactRouter);
app.use('/api/categories', cors(generalCorsOptions), checkJwt, categoryRouter);
app.use('/api/users', cors(generalCorsOptions), userRouter);
app.use('/api/auth', cors(userCorsOptions), authRouter);


//! Ecouter les erreurs du helper catchAsync
app.use((err, req, res, next) => {
    console.log(err);
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({erreur: err.message});
})

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);

