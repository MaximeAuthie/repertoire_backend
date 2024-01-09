//! Importer le modèle "user"
const User = require('../models/user');

//! Importer le helper "catchAsync"
const catchAsync = require('../helpers/catchAsync');
const { StatusCodes } = require('http-status-codes');

//! Liste des méthodes

    //? Méthode pour ajouter un utilisateur
    const addUser = catchAsync(async (req, res) => {

        // Ajout de l'utilisateur en BDD
        const user = await User.create(req.body);

        // Si la requête s'est exécutée correctement
        res
            .status(StatusCodes.ACCEPTED)
            .send(user);
    });

//! Exporter les méthodes
module.exports = {
    addUser
}