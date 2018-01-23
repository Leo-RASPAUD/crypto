const passport = require('passport');
const User = require('../models/User/User');
const validator = require('email-validator');
const exchangeHandler = require('../handlers/exchanges');

const listUsers = async (req, res) => {
    let users;
    try {
        users = await User.find({});
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error code : ${error.code}` });
    }
};

const addExchange = async (req, res) => {
    try {
        await exchangeHandler.testCredentials({ exchange: req.body });
        try {
            await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $push: { exchanges: { name: req.body.name, apiKey: req.body.apiKey, apiSecret: req.body.apiSecret } } },
                { safe: true, upsert: true },
            );
            const user = await User.findById(req.user.id);
            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: `Error code : ${error.code}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Invalid credentials' });
    }
};

const deleteExchange = async (req, res) => {
    const { exchangeName } = req.params;
    const { id } = req.params;
    let user;
    try {
        user = await User.findByIdAndUpdate(
            { _id: id },
            { $pull: { exchanges: { name: exchangeName } } },
            { safe: true, upsert: true },
        );
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error code : ${error.code}` });
    }
};


const createUser = async (req, res) => {
    const { email, password } = req.body;
    if (!validator.validate(email)) {
        res.status(500).json({ message: 'Invalid email' });
    } else {
        console.log('ici');
        const user = new User({ email, password });
        let newUser;
        try {
            newUser = await user.save();
            res.json(newUser);
        } catch (error) {
            if (error.code === 11000) {
                console.log(`User with email ${email} already exists`);
                res.status(400).json({ message: 'User already existing' });
            }
            console.log(`Error while trying to create a user ${error}`);
            res.status(500).json({ message: `Error code : ${error.code}` });
        }
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
    deleteExchange,
    createUser,
    listUsers,
    login,
    getUserDetails,
};
