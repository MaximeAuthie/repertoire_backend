//! Importer la dépendance "jsonwebytoken"
const jwt = require('jsonwebtoken');

//! Importer la dépendance "http-status-codes"
const { StatusCodes } = require('http-status-codes');

//! Récupérer le jwt dans le header de la requête
const checkJwt = (req, res, next) => {

    //? Vérifier si le header de la requête contient un jwt
    if (!req.headers.authorization) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({message: 'Missing jwt'});
    }

    const token = req.headers.authorization.toString().split('Bearer ').pop();

    //? Vérifier la validité du token
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, decodedToken) => {
        if (error) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({message: 'Authentication failed'});
        }

        // Passer à la suite du code
        next();
    })

}

//! Exporter le middleware

module.exports = checkJwt;