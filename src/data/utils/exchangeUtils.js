const binance = require('../../handlers/binance');
const kucoin = require('../../handlers/kucoin');

/* eslint-disable indent */
const getHandler = (exchangeName) => {
    switch (exchangeName) {
        case 'Binance':
            return binance;
        case 'Kucoin':
            return kucoin;
        default:
            return null;
    }
};

module.exports = {
    getHandler,
};
