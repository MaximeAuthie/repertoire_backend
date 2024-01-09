//! Importer le modèle "contact"
const Contact = require('../models/contact');

//! Importer le helper "catchAsync"
const catchAsync = require('../helpers/catchAsync');
const { StatusCodes } = require('http-status-codes');

//! Liste des méthodes

    //? Méthode pour obtenir la liste des contacts de l'utilisateur
    const getAllContactsByUser = catchAsync(async (req, res) => {
        
        // Récupérer les contact grace à l'id de l'utilisateur
        const contacts = await Contact.find({
            user: req.params.id
        });

        // Si la requête ne renvoie pas de résultats
        if (!contacts.length) {
            res
                .status(StatusCodes.NO_CONTENT)
                .send('No contact for this user')
        }
        
        // Si la requête renvoie des résultats
        res
            .status(StatusCodes.ACCEPTED)
            .send(contacts);
    });

    //? Méthode pour ajouter un contact
    const addContact = catchAsync(async (req, res) => {

        // Ajouter le contact à la BDD
        const contact = await Contact.create(req.body);

        // Si la requête s'est exécutée correctement
        res
            .status(StatusCodes.ACCEPTED)
            .send(contact);
    });


//! Exporter les méthodes
module.exports = {
    getAllContactsByUser,
    addContact
}