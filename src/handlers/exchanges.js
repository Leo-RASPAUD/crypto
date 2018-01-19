const binanceHandler = require('./binance');
const kucoinHandler = require('./kucoin');

const getData = async () => {
    binanceHandler.getData();
    kucoinHandler.getData();
};

module.exports = {
    getData,
};
