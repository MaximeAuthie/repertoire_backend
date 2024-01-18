//! Importer Mongoose
const mongoose = require('mongoose');

//! Importer la classe Schema de Mongoose
const Schema = mongoose.Schema;

//! Créer le modèle de document
const contactSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    landlinePhone1: String,
    landlinePhone2: String,
    mobilePhone1: String,
    mobilePhone2: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

module.exports = mongoose.model('Contact', contactSchema);