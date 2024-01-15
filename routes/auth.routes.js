//! Importer Express
const express =require('express');

//! Créer une instance de "router"
const router = express.Router();

//! Importer le contrôleur "auth"
const authController = require('../controllers/auth.controller');

//! Liste des routes

    //? Obtenir un JWT pour authentifier l'utilisateur
    router.post('/logIn', authController.getJwt);

//! Exporter le router
module.exports = router;
