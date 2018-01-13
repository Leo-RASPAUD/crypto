const mongoose = require('mongoose');

const { Schema } = mongoose;

const exchangeSchema = new mongoose.Schema({
    name: '',
    symbols: [{ type: Schema.Types.ObjectId, ref: 'Symbol' }],
});

module.exports = mongoose.model('Exchange', exchangeSchema);
