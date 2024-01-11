//! Importer les routeurs
const contactRouter = require('./routes/contact.routes');
const categoryRouter = require('./routes/category.routes');
const userRouter = require('./routes/user.routes');

//! Importer Express
const express = require('express');

//! Importer la dépendance Dotenv pour gérer les variables d'environnement
require('dotenv').config();

//! Importer la dépendance http-status-codes pour gérer les codes HTTP
const { StatusCodes } = require('http-status-codes');

//! Créer l'app
const app = express();

//! Importer Mongoose
const mongoose = require('mongoose');

//! Importer et paramétrer le package body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//! Connecter la BDD
mongoose.connect(process.env.DB_URL);

//! Gérer les routes
app.use('/contacts', contactRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

//! Ecouter les erreurs du helper catchAsync
app.use((err, req, res, next) => {
    console.log(err);
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
})

//! Ecouter le port
app.listen(3000, () => console.log(`Application lancée sur ${process.env.HOSTNAME}:${process.env.PORT}`));