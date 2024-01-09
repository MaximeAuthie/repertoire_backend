//! Importer le modèle "user"
const User = require('../models/user');

//! Liste des méthodes

    //? Méthode pour ajouter un utilisateur
    const addUser = async (req, res) => {
        const user = await User.create(req.body);
        res.send(user);
    }

//! Exporter les méthodes
module.exports = {
    addUser
}