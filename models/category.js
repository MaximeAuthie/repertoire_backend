//! Importer Mongoose
const mongoose = require('mongoose');

//! Importer la classe Schema de Mongoose
const Schema = mongoose.Schema;

//! Créer le modèle
const categorySchema = new Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Category', categorySchema);