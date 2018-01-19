const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    time: Date,
    value: '',
    exchange: '',
    symbol: '',
});

module.exports = mongoose.model('Price', priceSchema);
