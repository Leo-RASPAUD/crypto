const passport = require('passport');
const User = require('../models/User/User');

const listUsers = async (req, res) => {
    let users;
    try {
        users = await User.find({});
        return res.send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ _error: `Error code : ${error.code}` });
    }
};

const addExchange = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $push: { exchanges: { name: req.body.name, apiKey: req.body.apiKey, apiSecret: req.body.apiSecret } } },
            { safe: true, upsert: true },
        );
        const user = await User.findById(req.user.id);
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ _error: `Error code : ${error.code}` });
    }
};


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
            return res.status(200).send(user);
        });
    })(req, res, next);
};

const getUserDetails = async (req, res) => {
    let user;
    try {
        user = await User.findOne({ _id: req.params.id });
        return res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error code : ${error.code}` });
    }
};

module.exports = {
    addExchange,
    createUser,
    listUsers,
    login,
    getUserDetails,
};
