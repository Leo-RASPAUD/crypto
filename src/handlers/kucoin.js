const Kucoin = require('kucoin-api');
const Exchange = require('../models/Exchange/Exchange');
const Symbol = require('../models/Symbol/Symbol');

/* eslint-disable no-param-reassign */
const updateExchange = async ({ symbols, exchange }) => {
    exchange.symbols = symbols.map(symbol => symbol._id);
    const now = Date.now();
    await exchange.save();
    console.log(`Kucoin exchange symbols updated in ${Date.now() - now}ms`);
};

const updateSymbols = async ({ prices, keys }) => {
    const exchange = await Exchange.findOne({ name: 'Kucoin' });
    const { _id } = exchange;
    const { length } = keys;
    const promises = [];
    const time = Date.now();
    for (let i = 0; i < length; i += 1) {
        promises.push(Symbol.findOneAndUpdate(
            { exchange: _id, name: keys[i] },
            { $push: { prices: { value: prices[keys[i]], time } } },
            { safe: true, upsert: true },
        ));
    }
    const symbols = await Promise.all(promises);
    console.log(`Kucoin exchange prices updated in ${Date.now() - time}ms`);
    await updateExchange({ symbols, exchange });
};

const getData = async () => {
    console.log('Refresh Kucoin data ...');
    const kc = new Kucoin();
    kc.getTicker().then(console.log).catch(console.error);
};


module.exports = {
    getData,
};
