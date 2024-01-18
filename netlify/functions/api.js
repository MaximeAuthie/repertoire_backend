//! Importer les routeurs
// const contactRouter = require('./routes/contact.routes');
// const categoryRouter = require('./routes/category.routes');
// const userRouter = require('./routes/user.routes');
// const authRouter = require('./routes/auth.routes');

//! Importer la dépendance "serverless"
import express, { Router } from "express";
import serverless from "serverless-http";

//! Importer le middleware "checkJwt"
const checkJwt = require('./middlewares/jwtCheck');

//! Créer l'app
const app = express();

//! Gérer les routes
app.use('/contacts', cors(generalCorsOptions), checkJwt,'./routes/contact.routes');
app.use('/categories', cors(generalCorsOptions), checkJwt, './routes/category.routes');
app.use('/users', cors(generalCorsOptions), './routes/user.routes');
app.use('/auth', cors(userCorsOptions), './routes/auth.routes');

export const handler = serverless(api);