const Exchanges = require('../models/Exchange/Exchange');
const binanceHandler = require('./binance');

const getData = async () => {
    const exchanges = await Exchanges.find();
    const isBinance = exchanges.find(exchange => exchange.name === 'Binance');
    if (isBinance) {
        binanceHandler.getData();
    }
};

module.exports = {
    getData,
};
