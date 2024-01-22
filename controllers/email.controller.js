//! Importer le helper "catchAsync"
const catchAsync = require('../helpers/catchAsync');

//! Importer la dépendance Dotenv pour gérer les variables d'environnement
require('dotenv').config();

//! Importer le module "StatusCode" de la dépendance "http-status-codes"
const { StatusCodes } = require('http-status-codes');

//! Importer la dépendance "nodemailer"
const nodemailer = require("nodemailer");

//! Importer la dépendance "email-validator"
const emailValidator = require("email-validator");

//! Définir l'objet "transporter" => paramétrage du service d'envoi de mail
const transporter = nodemailer.createTransport({
    host: "smtp.orange.fr",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
})

//! Méthodes
const sendEmail = catchAsync(async (req, res) => {

    // Décomposer le body
    const { firstName, lastName, email, subject, content} = req.body;

    // Vérifier que toutes les informations ont correctement complétées
    if (!firstName || !lastName || !email || !subject || !content ) {
        return res
            .status(StatusCodes.CONFLICT)
            .json({message : "Missing data"});
    }

    // Vérifier le format de l'adresse email
    if (!emailValidator.validate(email)) {
        return res
            .status(StatusCodes.NOT_ACCEPTABLE)
            .json({message: "Incorrect email adress format"});
    }

    // Définir les options de l'email
    const emailOptions = {
        from: `${firstName} ${lastName} <${email}>`,
        to: "authie.maxime@gmail.com",
        subject: `MY REPOSITORY : ${subject}`,
        text: content
    };

    // Envoyer l'email
    transporter.sendMail(emailOptions)
        .then((info) => {
            console.log(info);
            return res
                .status(StatusCodes.ACCEPTED)
                .json({message: "Email sent with success"});
        })
        .catch((error) => {
            console.error(error);
        });
});

//! Exporter les méthode
module.exports = {
    sendEmail
}