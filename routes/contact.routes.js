//! Importer Express
const express = require('express');

//! Créer une instance de router
const router = express.Router();

//! Importer le controller contact
const contactController = require('../controllers/contact.controller');

//! Liste des routes

    //? Ajouter un contact
    router.post('/add', contactController.addContact);
    
    //? Obtenir un contact par son id
    router.get('/:id', contactController.getContactById);

    //? Obtenir tous les contacts d'un utilisateur
    router.get('/list/:id', contactController.getAllContactsByUser);
    
    //? Modifier un contact à partir de son id
    router.patch('/update/:id', contactController.updateContact);

    //? Supprimer un contact à partir de son id
    router.delete('/delete/:id', contactController.deleteContact);

//! Exporter le router
module.exports = router;