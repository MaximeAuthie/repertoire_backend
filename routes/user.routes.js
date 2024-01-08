//! Importer Express
const express = require('express');

//! Créer une instance de router
const router = express.Router();

//! Importer le contrôleur user
const userController = require('../controllers/user.controller');

//! Liste des routes


//! Exporter le router
module.export = router;