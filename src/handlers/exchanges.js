const Exchanges = require('../models/Exchange/Exchange');
const binanceHandler = require('./binance');
const kucoinHandler = require('./kucoin');

const getData = async () => {
    const exchanges = await Exchanges.find();
    const isBinance = exchanges.find(exchange => exchange.name === 'Binance');
    const isKucoin = exchanges.find(exchange => exchange.name === 'Kucoin');
    if (isBinance) {
        binanceHandler.getData();
    }
    if (isKucoin) {
        kucoinHandler.getData();
    }
};

module.exports = {
    getData,
};
