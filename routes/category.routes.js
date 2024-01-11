//! Importer Express
const express = require('express');

//! Créer une instance de router
const router = express.Router();

//! Importer le contrôleur category
const categoryController = require('../controllers/category.controller');

//! Liste des routes

    //? Ajouter une catégorie
    router.post('/add', categoryController.addCategory);

    //? Obtenir une catégorie
    router.get('/:id', categoryController.getCategory);

    //? Obtenir la liste des catégories d'un utilisateur
    router.get('/list/:id', categoryController.getAllCategoriesByUser);

    //? Modifier une catégorie
    router.patch('/update/:id', categoryController.updateCategorie);

    //? Supprimer une catégorie
    router.delete('/delete/:id', categoryController.deleteCategorie);

//! Exporter le router
module.exports = router;