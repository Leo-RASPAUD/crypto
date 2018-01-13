const mongoose = require('mongoose');

const symbolsSchema = new mongoose.Schema({
    name: '',
    prices: [],
});

module.exports = mongoose.model('Symbol', symbolsSchema);
