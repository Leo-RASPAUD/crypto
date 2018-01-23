const binanceHandler = require('./binance');
const kucoinHandler = require('./kucoin');

const testCredentials = ({ exchange }) => {
    if (exchange.name === 'Kucoin') {
        return kucoinHandler.getAccountInfo({ credentials: exchange });
    }
    if (exchange.name === 'Binance') {
        return binanceHandler.getAccountInfo({ credentials: exchange });
    }
    return Promise.resolve({ status: 500, message: 'Handler not found' });
};

const getData = async () => {
    binanceHandler.getData();
    kucoinHandler.getData();
};

module.exports = {
    getData,
    testCredentials,
};
