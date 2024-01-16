//! Définir les diffférentes options

const generalCorsOptions = {
    origin: "*",
    methods: ['GET','PATCH','POST','DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}

const userCorsOptions = {
    origin: "*",
    methods: ['GET','PATCH','POST'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}

//! Exporter les options
module.exports = {
    generalCorsOptions,
    userCorsOptions
}