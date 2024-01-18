//! Importer Express
const express = require('express');

//! Importer le middleware "checkJwt"
const checkJwt = require('../middlewares/jwtCheck');

//! Créer une instance de router
const router = express.Router();

//! Importer le contrôleur user
const userController = require('../controllers/user.controller');

//! Liste des routes

    //? Ajouter un utilisateur
    router.post('/add', userController.addUser);

    //? Obtenir un utilisateur
    router.get('/:id', checkJwt, userController.getUser);

    //? Mettre à jour un utilisateur
    router.patch('/update/:id', checkJwt, userController.updateUser);

//! Exporter le router
module.exports = router;