//! Importer Express
const express = require('express');

//! Créer une instance de router
const router = express.Router();

//! Importer le controller contact
const contactController = require('../controllers/contact.controller');

//! Liste des routes

//! Exporter le router
module.export = router;