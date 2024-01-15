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



//! Exporter les méthodes
module.exports = {
    getJwt
}