const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoSession = require('mongoose-express-session');
const session = require('express-session');
const mongoose = require('mongoose');
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

mongoose.connect(`${DB_TYPE}://${HOST}:${DB_PORT}/${DB_NAME}`);
const MongooseStore = mongoSession(session.Store);
const mongoStore = new MongooseStore({ connection: mongoose });
mongoose.Promise = global.Promise;

app.use(cors({
    origin: 'http://localhost:8082',
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cookieParser(conf.authentication.sessionSecret));
app.use(session({
    secret: conf.authentication.sessionSecret,
    resave: true,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { domain: 'localhost' },
    key: 'sessionId',
}));

// Passport
passport.use(localStrategy);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(path.join(__dirname, './src/public/index.html')));
app.use('/assets', express.static(path.join(__dirname, './assets')));

const indexPath = path.join(__dirname, './src/public/index.html');

app.get('/', (_, res) => {
    res.sendFile(indexPath);
});

// Endpoints
app.post('/user/:id/addExchange', security.isAuthenticated, userEndpoints.addExchange);
app.post('/login', userEndpoints.login);
app.get('/user', security.isAuthenticated, userEndpoints.listUsers);
app.post('/createUser', userEndpoints.createUser);
app.get('/user/:id', security.isAuthenticated, userEndpoints.getUserDetails);
app.get('/exchange', security.isAuthenticated, exchangesEndpoints.list);
app.get('/exchange/:name', security.isAuthenticated, exchangesEndpoints.getSymbols);

app.get('/getApiParams', (_, res) => {
    res.send({
        host: process.env.API_HOST || 'localhost:8085',
        port: PORT,
    });
});

app.get('*', (req, res) => {
    const file = req.path.split('/');
    if (req.originalUrl.match(/.*favicon.*png$/)) {
        res.sendFile(path.join(__dirname, './assets', `${file[file.length - 2]}/${file[file.length - 1]}`));
    } else if (req.originalUrl.match(/.*.(ttf|woff|woff2|png|svg|jpg|js|eot|gif|css)$/)) {
        res.sendFile(path.join(__dirname, './assets', file[file.length - 1]));
    } else {
        res.sendFile(indexPath);
    }
});

app.listen(PORT, async () => {
    exchangesHandler.getData();
    console.log(`Backend runing on port : ${PORT}`);
});
