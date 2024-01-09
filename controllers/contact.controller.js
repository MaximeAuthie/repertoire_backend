//! Importer le modèle "contact"
const Contact = require('../models/contact');

//! Importer Mongoose
const mongoose = require('mongoose');

//! Importer le helper "catchAsync"
const catchAsync = require('../helpers/catchAsync');

//! Liste des méthodes

    //? Méthode pour obtenir la liste des contacts de l'utilisateur
    const getAllContacts = catchAsync(async (req, res) => {
        const contacts = await Contact.find();
        res.send(contacts);
    });

    //? Méthode pour ajouter un contact
    const addContact = async (req, res) => {
        const contact = await Contact.create(req.body);
        res.send(contact);
    }


//! Exporter les méthodes
module.exports = {
    getAllContacts,
    addContact
}