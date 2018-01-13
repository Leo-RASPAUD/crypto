const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
    name: '',
});

module.exports = mongoose.model('Exchange', exchangeSchema);
