//! Importer Express
const express = require('express');

//! Créer une instance de router
const router = express.Router();

//! Importer le contrôleur user
const userController = require('../controllers/user.controller');

//! Liste des routes

    //? Ajouter un utilisateur
    router.post('/add', userController.addUser);

    //? Obtenir un utilisateur
    router.get('/:id', userController.getUser);

    //? Mettre à jour un utilisateur
    router.patch('/update/:id', userController.updateUser);

//! Exporter le router
module.exports = router;