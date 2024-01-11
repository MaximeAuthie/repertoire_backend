//! Importer le modèle "category"
const Category = require('../models/category');

//! Importer le helper "catchAsync"
const catchAsync = require('../helpers/catchAsync');

//! Importer le module "StatusCode" de la dépendance "http-status-codes"
const { StatusCodes } = require('http-status-codes');

//! Méthodes

    //? Ajouter une catégorie
    const addCategory = catchAsync(async (req, res) => {

        // Ajouter la catégorie à la BDD
        const category = await Category.create(req.body);

        // Si la requête s'est exécutée correctement
        res
            .status(StatusCodes.ACCEPTED)
            .send(category);
    });

    //? Obtenir une catégorie à partir de son id
    const getCategory = catchAsync(async (req, res) => {

        // Récupérer le contact grace à son id
        const category = await Category.findById(req.params.id);
        
        // Récupérer le contact grace à son id
        if (category) {
            res
                .status(StatusCodes.ACCEPTED)
                .send(category);
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .send('The requested category doesn\'t exist');
        }
    });

    //? Obtenir la liste des catégories de l'utilisateur
    const getAllCategoriesByUser = catchAsync(async (req, res) => {

        // Récupérer la liste des catégories de l'utilisateur
        const categories = await Category.find({
            user: req.params.id
        });

        // Vérifier si la requête renvoie un résultat
        if (categories.length) {
            res
                .status(StatusCodes.ACCEPTED)
                .send(categories);
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .send('No category found for this user');
        }
    });

    //? Modifier une categorie à partir de son id
    const updateCategorie = catchAsync(async (req, res) => {

        // Mettre à jour la catégorie
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});

        // Vérifier si la requête renvoie un résultat
        if (category) {
            res
                .status(StatusCodes.ACCEPTED)
                .send(category);
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .send('The requested category doesn\'t exist');
        }
    });

    //? Supprimer une catégorie à partir de son id
    const deleteCategorie = catchAsync(async (req, res) => {

        // Supprimer la catégorie
        const category = await Category.findByIdAndDelete(req.params.id)

        // Vérifier si la requête s'est exécutée correctement
        if (category) {
            res
                .status(StatusCodes.ACCEPTED)
                .send('Category deleted with success');
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .send('The requested category doesn\'t exist');
        }
    });

//! Exporter les méthodes
module.exports = {
    addCategory,
    getCategory,
    getAllCategoriesByUser,
    updateCategorie,
    deleteCategorie
}