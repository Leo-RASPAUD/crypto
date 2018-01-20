const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    exchange: '',
    time: Date,
    symbols: [{
        name: '',
        value: '',
    }],
});

module.exports = mongoose.model('Price', priceSchema);
