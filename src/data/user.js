const passport = require('passport');
const User = require('../models/User/User');

const createUser = async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });

    let newUser;
    try {
        newUser = await user.save();
        return res.json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            console.log(`User with email ${email} already exists`);
            return res.status(400).json({ email: 'User already existing' });
        }
        console.log(`Error while trying to create a user ${error}`);
        return res.status(500).json({ _error: `Error code : ${error.code}` });
    }
};

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(403).json(info);
        }
        return req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.json({
                id: user.id,
                email: user.email,
                apiKeys: user.apiKeys,
            });
        });
    })(req, res, next);
};

module.exports = {
    createUser,
    login,
};
