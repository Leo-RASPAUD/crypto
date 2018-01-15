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

const updateSymbols = async ({ prices }) => {
    const exchange = await Exchange.findOne({ name: 'Kucoin' });
    const { _id } = exchange;
    const { length } = prices;
    const promises = [];
    const time = Date.now();
    for (let i = 0; i < length; i += 1) {
        promises.push(Symbol.findOneAndUpdate(
            { exchange: _id, name: prices[i].symbol.replace('-', '') },
            { $push: { prices: { value: prices[i].lastDealPrice, time } } },
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
    const prices = await kc.getTicker({ pair: '' });
    await updateSymbols({ prices: prices.data });
    console.log('Refresh Kucoin data: OK');
};

const getAccountInfo = async ({ credentials }) => {
    const kc = new Kucoin(credentials.apiKey, credentials.apiSecret);
    return kc.getBalance();
};

module.exports = {
    getData,
    getAccountInfo,
};
