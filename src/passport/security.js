const passport = require('passport');
const jwt = require('jsonwebtoken');
const conf = require('../../conf/conf');
const User = require('../models/User/User');

passport.serializeUser((user, cb) => cb(null, user.token));
passport.deserializeUser((token, callback) => {
    try {
        const payload = jwt.verify(
            token,
            conf.authentication.jwtSecret,
            { issuer: conf.authentication.issuer },
        );

        return User.findById(payload.sub)
            .then((user) => {
                callback(
                    null,
                    {
                        id: user._id,
                        email: user.email,
                        countries: user.countries,
                    },
                );
            });
    } catch (e) {
        return callback(e);
    }
});

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('error');
    return res.status(403).send({ status: 403, message: 'User not authorized' });
};

module.exports = {
    isAuthenticated,
};
