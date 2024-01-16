//! Importer le modèle "contact"
const Contact = require('../models/contact');

//! Importer le helper "catchAsync"
const catchAsync = require('../helpers/catchAsync');

//! Importer le module "StatusCode" de la dépendance "http-status-codes"
const { StatusCodes } = require('http-status-codes');

//! Liste des méthodes

    //? Ajouter un contact
    const addContact = catchAsync(async (req, res) => {

        // Ajouter le contact à la BDD
        const contact = await Contact.create(req.body);

        // Si la requête s'est exécutée correctement
        return res
            .status(StatusCodes.ACCEPTED)
            .json(contact);
    });

    //? Obtenir un contact à partir de son id
    const getContactById = catchAsync(async (req, res) => {

        // Récupérer le contact grace à son id
        const contact = await Contact.findById(req.params.id);

        // Vérifier si la requête renvoie un résultat
        if (contact) {
            return res
                .status(StatusCodes.ACCEPTED)
                .send(contact);
        } else {
            return res
                .status(StatusCodes.NO_CONTENT)
                .send('The requested contact doesn\'t exist');
        }

    })

    //? Obtenir la liste des contacts de l'utilisateur
    const getAllContactsByUser = catchAsync(async (req, res) => {
        
        // Récupérer les contact grace à l'id de l'utilisateur
        const contacts = await Contact.find({
            user: req.params.id
        });

        // Vérifier si la requête renvoie un résultat
        if (contacts.length) {
            return res
            .status(StatusCodes.ACCEPTED)
            .json(contacts);
        } else {
            return res
                .status(StatusCodes.NO_CONTENT)
                .json({message: 'No contact found for this user'});
        }
    });

    //? Modifier un contact à partir de son id
    const updateContact = catchAsync(async (req, res) => {

        // Mettre à jour le contact
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});

        // Vérifier si la requête renvoie un résultat
        if (contact) {
            return res
                .status(StatusCodes.ACCEPTED)
                .json(contact);
        } else {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({message: 'The requested contact doesn\'t exist'});
        }
    })

    //? Supprimer un contact à partir de son id
    const deleteContact = catchAsync(async (req, res) => {

        // Supprimer le contact
        const contact = await Contact.findByIdAndDelete(req.params.id)

        // Vérifier si la requête renvoie un résultat
        if (contact) {
            return res
                .status(StatusCodes.ACCEPTED)
                .json({message: 'Contact deleted with success'});
        } else {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({message: 'The requested contact doesn\'t exist'});
        }
    } )

//! Exporter les méthodes
module.exports = {
    addContact,
    getContactById,
    getAllContactsByUser,
    updateContact,
    deleteContact
}