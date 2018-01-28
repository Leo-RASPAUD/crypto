const binance = require('../../handlers/binance');
const kucoin = require('../../handlers/kucoin');
const coinbase = require('../../handlers/coinbase');

/* eslint-disable indent */
const getHandler = (exchangeName) => {
    switch (exchangeName) {
        case 'Binance':
            return binance;
        case 'Kucoin':
            return kucoin;
        case 'Coinbase':
            return coinbase;
        default:
            return null;
    }
};

module.exports = {
    getHandler,
};
