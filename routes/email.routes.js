//! Importer Express
const express = require('express');

//! Créer une instance de router
const router = express.Router();

//! Importer le controller "email"
const emailController = require('../controllers/email.controller');

//! Liste des routes

    //? Envoyer un email de contact
    router.post('/send', emailController.sendEmail);

//! Exporter le router
module.exports = router;