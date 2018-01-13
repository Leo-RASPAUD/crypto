const binance = require('binance-api-node');
const Symbol = require('../models/Symbol/Symbol');

const getData = async () => {
    console.log('Refresh Binance data ...');
    const clientBinance = binance.default();
    const prices = await clientBinance.prices();
    const keys = Object.keys(prices);
    const promises = [];
    for (let i = 0; i < keys.length; i += 1) {
        promises.push(Symbol.updateOne(
            { name: keys[i] },
            { $push: { prices: prices[keys[i]] } },
            { safe: true, upsert: true },
        ));
    }
    try {
        await Promise.all(promises);
    } catch (error) {
        console.log(error);
    }
    console.log('Refresh Binance data: OK');
};


module.exports = {
    getData,
};
