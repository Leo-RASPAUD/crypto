const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoSession = require('mongoose-express-session');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const localStrategy = require('./src/passport/localStrategy');
const userEndpoints = require('./src/data/user');
const security = require ('./src/passport/security');

const app = express();
const PORT = process.env.PORT || 8085;
const DB_TYPE = process.env.DB_TYPE || 'mongodb';
const HOST = process.env.HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '54621';
const DB_NAME = process.env.DB_NAME || 'crypto';

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

// Passport
passport.use(localStrategy);
app.use(passport.initialize());
app.use(passport.session());

// Mongoose
const MongooseStore = mongoSession(expressSession.Store);
const db = mongoose.connect(`${DB_TYPE}://${HOST}:${DB_PORT}/${DB_NAME}`);
const mongoStore = new MongooseStore({ connection: mongoose });
mongoose.Promise = global.Promise;


// Endpoints
app.post('/createUser', userEndpoints.createUser);
app.post('/login', userEndpoints.login);

app.listen(PORT, async () => {
    console.log(`Backend runing on port : ${PORT}`);
});