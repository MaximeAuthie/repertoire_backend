//! Importer Mongoose
const mongoose = require('mongoose');

//! Importer la classe Schame de Mongoose
const Schema = mongoose.Schema;

//! Créer le modèle
const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

module.export = mongoose.model('User', userSchema);