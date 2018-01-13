const mongoose = require('mongoose');

const { Schema } = mongoose;

const symbolSchema = new mongoose.Schema({
    name: '',
    test: String,
    exchange: { type: Schema.Types.ObjectId, ref: 'Exchange' },
    prices: [{
        value: String,
        time: { type: Date, default: Date.now },
    }],
});


module.exports = mongoose.model('Symbol', symbolSchema);
