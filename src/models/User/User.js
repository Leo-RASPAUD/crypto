const mongoose = require('mongoose');
const userModelUtils = require('./utils.js');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: { unique: true },
    },
    password: { type: String, required: true },
    exchanges: [{
        apiKey: String,
        apiSecret: String,
        name: String,
    }],
});

userSchema.pre('save', userModelUtils.preSave);
userSchema.methods.comparePassword = userModelUtils.comparePassword;

module.exports = mongoose.model('User', userSchema);
