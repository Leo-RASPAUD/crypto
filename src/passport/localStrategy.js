const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const User = require('../models/User/User');

const authentication = {
    jwtSecret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaXRlIjoiY3J5cHRvIiwiY3JlYXRvciI6Imxlb3Jhc3BhdWQiLCJqdGkiOiJjODc0YTUzYi0yNDMwLTRkNzQtYjE3ZC00NDhjZmZjYzZiODciLCJpYXQiOjE1MTU3NDk4ODUsImV4cCI6MTUxNTc1MzQ4NX0.QF5uyOEenBqVyi-vfCFPtzfYyx_wJMPDApcJCdJ6WBw',
    issuer: 'crypto',
};

module.exports = new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) =>
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return done(null, false, { email: 'Account not found' });
            }
            return user.comparePassword(password)
                .then((isMatch) => {
                    if (isMatch) {
                        const token = jwt.sign(
                            {
                                sub: user.id,
                                iat: Math.floor(Date.now() / 1000) - 30,
                            },
                            authentication.jwtSecret,
                            {
                                issuer: 'crypto',
                                algorithm: 'HS256',
                            },
                        );
                        return done(null, user);
                    }
                    return done(null, false, { password: 'Incorrect password' });
                });
        }),
);