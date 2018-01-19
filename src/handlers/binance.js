const binance = require('binance-api-node');
// const Exchange = require('../models/Exchange/Exchange');
// const Symbol = require('../models/Symbol/Symbol');
const Price = require('../models/Price/Price');

const getData = async () => {
    console.log('Refresh Binance data ...');
    const time = Date.now();
    const clientBinance = binance.default();
    const prices = await clientBinance.prices();
    const symbolKeys = Object.keys(prices);
    await Promise.all(symbolKeys.map(symbolKey => new Promise(async (resolve) => {
        const price = new Price({ symbol: symbolKey, value: prices[symbolKey], time, exchange: 'Binance' });
        resolve(price.save());
    })));
    console.log(`Binance data updated in ${Date.now() - time}ms`);
};

const getAccountInfo = async ({ credentials }) => {
    console.log('Getting Binance account informations...');
    const clientBinance = binance.default({ apiKey: credentials.apiKey, apiSecret: credentials.apiSecret });
    let accountInfo;
    const promises = [];
    try {
        accountInfo = await clientBinance.accountInfo();
        accountInfo.balances.filter(item => (item.free > 0.001 || item.locked > 0.001)).map((balanceItem) => {
            const symbol = balanceItem.asset === 'ETH' || balanceItem.asset === 'BTC' ? `${balanceItem.asset}USDT` : `${balanceItem.asset}ETH`;
            return promises.push(clientBinance.allOrders({ symbol }));
        });
        try {
            accountInfo.orders = await Promise.all(promises);
            accountInfo.orders = accountInfo.orders
                .map(order => order.filter(item => item.side === 'BUY'))
                .map(itemMapArray => itemMapArray.map(itemMap => ({ ...itemMap, dealPrice: itemMap.price, pair: itemMap.symbol })));
            return Promise.resolve(accountInfo);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    } catch (error) {
        console.log('Binance.getAccountInfo:', error);
        return Promise.reject(error);
    }
};


module.exports = {
    getData,
    getAccountInfo,
};
