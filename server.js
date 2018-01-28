const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoSession = require('mongoose-express-session');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const security = require('./src/passport/security');
const localStrategy = require('./src/passport/localStrategy');
const userEndpoints = require('./src/data/user');
const exchangesEndpoints = require('./src/data/exchanges');
const conf = require('./conf/conf');
const exchangesHandler = require('./src/handlers/exchanges');

const app = express();


mongoose.connect(`${conf.params.db_type}://${conf.params.mongoHost}:${conf.params.db_port}/${conf.params.db_name}`);
const MongooseStore = mongoSession(session.Store);
const mongoStore = new MongooseStore({ connection: mongoose });
mongoose.Promise = global.Promise;

app.use(cors({
    origin: [
        'http://localhost:8082',
        `http://${conf.params.host}`,
    ],
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
    cookie: { domain: `${conf.params.host}` },
    key: 'sessionId',
}));

// Passport
passport.use(localStrategy);
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());


// Endpoints
app.post('/login', userEndpoints.login);

// User
app.get('/user', security.isAuthenticated, userEndpoints.listUsers);
app.post('/user', userEndpoints.createUser);
app.get('/user/:id', security.isAuthenticated, userEndpoints.getUserDetails);
app.post('/user/:id/addExchange', security.isAuthenticated, userEndpoints.addExchange);
app.delete('/user/:id/exchange/:exchangeName', security.isAuthenticated, userEndpoints.deleteExchange);

// Exchange
app.get('/exchange', security.isAuthenticated, exchangesEndpoints.list);
app.get('/exchange/:name/Symbol', security.isAuthenticated, exchangesEndpoints.getSymbols);
app.post('/exchange/:name/accountInformations', security.isAuthenticated, exchangesEndpoints.getAccountInfo);
app.get('/exchange/:name/Price/:symbol', security.isAuthenticated, exchangesEndpoints.getPrices);
app.get('/exchange/:name/Price/:symbol/Trend', security.isAuthenticated, exchangesEndpoints.getTrendInEth);

app.get('/getApiParams', (_, res) => {
    res.send({
        host: conf.params.host,
        port: conf.params.port,
    });
});

app.use('/', express.static(path.join(__dirname, './src/public/index.html')));
app.use('/assets', express.static(path.join(__dirname, './dist')));

const indexPath = path.join(__dirname, './src/public/index.html');

app.get('/', (_, res) => {
    res.sendFile(indexPath);
});


app.get('*', (req, res) => {
    const file = req.path.split('/');
    if (req.originalUrl.match(/.*favicon.*png$/)) {
        res.sendFile(path.join(__dirname, './dist', `${file[file.length - 2]}/${file[file.length - 1]}`));
    } else if (req.originalUrl.match(/.*.(ttf|woff|woff2|png|svg|jpg|js|eot|gif|css)$/)) {
        res.sendFile(path.join(__dirname, './dist', file[file.length - 1]));
    } else {
        res.sendFile(indexPath);
    }
});

app.listen(conf.params.port, async () => {
    setInterval(() => {
        exchangesHandler.getData();
    }, 5000);
    console.log(`Backend runing on port : ${conf.params.port}`);
});
