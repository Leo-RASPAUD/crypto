const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoSession = require('mongoose-express-session');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const security = require('./src/passport/security');
const localStrategy = require('./src/passport/localStrategy');
const userEndpoints = require('./src/data/user');
const exchangesEndpoints = require('./src/data/exchanges');
const conf = require('./conf/conf');
const exchangesHandler = require('./src/handlers/exchanges');

const app = express();
const PORT = process.env.PORT || 8085;
const DB_TYPE = process.env.DB_TYPE || 'mongodb';
const HOST = process.env.HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '54621';
const DB_NAME = process.env.DB_NAME || 'crypto';

const MongooseStore = mongoSession(expressSession.Store);
const db = mongoose.connect(`${DB_TYPE}://${HOST}:${DB_PORT}/${DB_NAME}`);
const mongoStore = new MongooseStore({ connection: mongoose });
mongoose.Promise = global.Promise;

app.use(cors({
    origin: 'localhost:8082',
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(session({
    secret: conf.authentication.sessionSecret,
    resave: true,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { domain: 'localhost' },
    key: 'sessionId',
}));
app.use(cookieParser(conf.authentication.sessionSecret));

// Passport
passport.use(localStrategy);
app.use(passport.initialize());
app.use(passport.session());

// Endpoints
app.post('/user/createUser', userEndpoints.createUser);
app.get('/user', security.isAuthenticated, userEndpoints.listUsers);
app.post('/user/addExchange', security.isAuthenticated, userEndpoints.addExchange);
app.post('/login', userEndpoints.login);
app.get('/exchanges', security.isAuthenticated, exchangesEndpoints.list);

app.listen(PORT, async () => {
    exchangesHandler.getData();
    console.log(`Backend runing on port : ${PORT}`);
});
