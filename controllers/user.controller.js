//! Importer le modèle "user"
const User = require('../models/user');

//! Importer le helper "catchAsync"
const catchAsync = require('../helpers/catchAsync');
const { StatusCodes } = require('http-status-codes');

//! Importer la dépendance Bcrypt
const bcrypt = require('bcrypt');

//! Liste des méthodes

    //? Méthode pour ajouter un utilisateur
    const addUser = catchAsync(async (req, res) => {
        
        // Vérifier si l'utilisateur existe déjà
        if (!(await User.find({email: req.body.email})).length) {
            
            // Eclater le body
            const {firstName, lastName, email, password} = req.body

            // Hasher le password
            bcrypt.hash(password, parseInt(process.env.BCRYP_SALT_ROUND)).then(async hash => {
                req.body.password = hash;

                // Ajout de l'utilisateur en BDD
                const user = await User.create(req.body);

                // Si la requête s'est exécutée correctement
                res
                    .status(StatusCodes.ACCEPTED)
                    .send(user);
            });

        } else {

            // L'utilisateur existe déjà
            res
                .status(StatusCodes.CONFLICT)
                .send('The email adress is already used')
        }
    });

//! Exporter les méthodes
module.exports = {
    addUser
}