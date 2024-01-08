//! Importer Express
const express = require('express');

//! Créer une instance de router
const router = express.Router();

//! Importer le contrôleur category
const categoryController = require('../controllers/category.controller');

//! Liste des routes


//! Exporter le router
module.export = router;