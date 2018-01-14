const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const User = require('../models/User/User');
const conf = require('../../conf/conf');

module.exports = new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) =>
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return done(null, false, { message: 'Account not found' });
            }
            return user.comparePassword(password)
                .then((isMatch) => {
                    if (isMatch) {
                        const token = jwt.sign(
                            {
                                sub: user.id,
                                iat: Math.floor(Date.now() / 1000) - 30,
                            },
                            conf.authentication.jwtSecret,
                            {
                                issuer: conf.authentication.issuer,
                                algorithm: 'HS256',
                            },
                        );
                        return done(null, {
                            id: user.id,
                            email: user.email,
                            token,
                        });
                    }
                    return done(null, false, { message: 'Incorrect password' });
                });
        }),
);