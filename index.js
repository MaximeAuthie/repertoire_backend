//! Initialiser les variables d'accès au serveur
const hostname = 'http://127.0.0.1';
const port = 3000;

//! Importer le routeurs
const contactRouter = require('./routes/contact.routes');
const categoryRouter = require('./routes/category.routes');
const userRouter = require('./routes/user.routes');

//! Importer Express
const express = require('express');

//! Importer Mongoose
const mongoose = require('mongoose');

//! Créer l'app
const app = express();

//! Connecter la BDD
mongoose.connect('mongodb://localhost/repertoire');

//! Gérer les routes
// app.use('/contacts', contactRouter);
// app.use('/categories', categoryRouter);
// app.use('/user', userRouter);

//! Ecouter le port
app.listen(3000, () => console.log(`Application lancée sur ${hostname}:${port}`));