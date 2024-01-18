//! Importer le modèle "user"
const User = require('../models/user');

//! Importer le helper "catchAsync"
const catchAsync = require('../helpers/catchAsync');

//! Importer le module "StatusCode" de la dépendance "http-status-codes"
const { StatusCodes } = require('http-status-codes');

//! Importer la dépendance Bcrypt
const bcrypt = require('bcrypt');

//! Liste des méthodes

    //? Ajouter un utilisateur
    const addUser = catchAsync(async (req, res) => {

        // Eclater le body
        const {firstName, lastName, email, password} = req.body;

        // Vérifier que toutes les données sont présentes
        if (!firstName || !lastName || !email || !password) {
            return res
                .status(StatusCodes.CONFLICT)
                .json({message: "Missing data"});
        }
        
        // Vérifier si l'utilisateur existe déjà
        if (!(await User.find({email: req.body.email})).length) {
            
            // Eclater le body
            const {firstName, lastName, email, password} = req.body

            // Hasher le password
            bcrypt.hash(password, parseInt(process.env.BCRYP_SALT_ROUND)).then(async hash => {
                
                // Modifier le password dans le body de la requête
                req.body.password = hash;

                // Ajouter la propriété "isActive" au body de la requête
                req.body.isActive = true;

                // Ajout de l'utilisateur en BDD
                const user = await User.create(req.body);

                // Si la requête s'est exécutée correctement
                return res
                    .status(StatusCodes.ACCEPTED)
                    .send(user);
            });

        } else {

            // L'utilisateur existe déjà
            return res
                .status(StatusCodes.CONFLICT)
                .send('The email adress is already used')
        }
    });

    //? Obtenir un utilisateur à partir de son id
    const getUser = catchAsync(async (req, res) => {

        // Récupérer l'utilisateur en BDD
        const user = await User.findById(req.params.id);

        // Vérifier si l'utilisateur existe
        if (user) {
            return res
                .status(StatusCodes.ACCEPTED)
                .json(user);
        } else {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({message: "The requested user doesn't exist"})
        }
    });

    //? Mettre à jour un utilisateur à partir de son id
    const updateUser = catchAsync(async (req, res) => {

        // Eclater le body
        const {firstName, lastName, email, password} = req.body;

        // Vérifier que toutes les données sont présentes
        if (!firstName || !lastName || !email) {
            return res
                .status(StatusCodes.CONFLICT)
                .json({message: "Missing data"});
        }

        // Vérifier si le password doit être modifié
        if (!req.body.password) {

            // Récupérer le password de la BDD
            const userToUpdate = await User.findById(req.params.id);
            
            // Ajouter le password de la BDD au body
            req.body.password = userToUpdate.password;

        } else {
            
            // Crypter le password
            const newPassword = await bcrypt.hash(password, parseInt(process.env.BCRYP_SALT_ROUND));
            
            // Remplacer le password de la requête par le mot de passe crypté
            req.body.password = newPassword;
        }

        // Mettre à jour l'utilisateur
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

        // Vérifier si l'utilisateur existe
        if (user) {
            return res
                .status(StatusCodes.ACCEPTED)
                .json({message: "User updated", data: user});
        } else {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({message : "The requested user doesn't exist"})
        }
    });

    

//! Exporter les méthodes
module.exports = {
    addUser,
    getUser,
    updateUser
}