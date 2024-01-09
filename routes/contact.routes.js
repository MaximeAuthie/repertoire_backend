//! Importer Express
const express = require('express');

//! Créer une instance de router
const router = express.Router();

//! Importer le controller contact
const contactController = require('../controllers/contact.controller');

//! Liste des routes

    //? Obtenir tous les contacts
    router.get('/list', contactController.getAllContacts);

    //? Ajouter un contact
    router.post('/add', contactController.addContact);

//! Exporter le router
module.exports = router;