//! Importer le modèle "user"
const User = require('../models/user');

//! Importer le helper "catchAsync"
const catchAsync = require('../helpers/catchAsync');

//! Importer la dépendance Bcrypt
const bcrypt = require('bcrypt');

//! Importer la dépendance jsonwebtoken
const jwt = require('jsonwebtoken');

//! Importer le module "StatusCode" de la dépendance "http-status-codes"
const { StatusCodes } = require('http-status-codes');

//! Liste des méthodes

    //? Obtenir un JWT
    const getJwt = catchAsync(async (req, res) => {

        // Décomposer le body
        const { email, password } = req.body;

        // Vérifier que toutes les données sont présentes
        if (!email || !password) {
            return res
                .status(StatusCodes.CONFLICT)
                .json({message: 'Missing data'});
        }

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({email: email});

        if (!user) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({message: 'Wrong email or password'});
        }

        // Vérifier si le password est correct
        const isPasswordOk = await bcrypt.compare(password, user.password);
        if (!isPasswordOk) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({message: 'Wrong email or password'})
        }

        // Générer un JWT
        const token = jwt.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }, process.env.JWT_PRIVATE_KEY, {expiresIn: process.env.JWT_DURATION});

        return res
            .status(StatusCodes.ACCEPTED)
            .json({jwt: token});
    })


//! Exporter les méthodes
module.exports = {
    getJwt
}