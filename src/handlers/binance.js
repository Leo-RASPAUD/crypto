const binance = require('binance-api-node');
const Exchange = require('../models/Exchange/Exchange');
const Symbol = require('../models/Symbol/Symbol');

/* eslint-disable no-param-reassign */
const updateExchange = async ({ symbols, exchange }) => {
    exchange.symbols = symbols.map(symbol => symbol._id);
    const now = Date.now();
    await exchange.save();
    console.log(`Binance exchange symbols updated in ${Date.now() - now}ms`);
};

const updateSymbols = async ({ prices, keys }) => {
    const exchange = await Exchange.findOne({ name: 'Binance' });
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
    console.log(`Binance exchange prices updated in ${Date.now() - time}ms`);
    await updateExchange({ symbols, exchange });
};

const getData = async () => {
    console.log('Refresh Binance data ...');
    const clientBinance = binance.default();
    const prices = await clientBinance.prices();
    const keys = Object.keys(prices);
    await updateSymbols({ prices, keys });
    console.log('Refresh Binance data: OK');
};

const getAccountInfo = ({ credentials }) => {
    console.log('Getting Binance account informations...');
    const clientBinance = binance.default({ apiKey: credentials.apiKey, apiSecret: credentials.apiSecret });
    return clientBinance.accountInfo();
};

module.exports = {
    getData,
    getAccountInfo,
};
