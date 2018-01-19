const Kucoin = require('kucoin-api');
const Price = require('../models/Price/Price');

const getData = async () => {
    console.log('Refresh Kucoin data ...');
    const time = Date.now();
    const kc = new Kucoin();
    const prices = await kc.getTicker({ pair: '' });
    await Promise.all(prices.data.map(price => new Promise(async (resolve) => {
        const newPrice = new Price({ symbol: price.symbol.replace('-', ''), value: price.lastDealPrice, time, exchange: 'Kucoin' });
        resolve(newPrice.save());
    })));
    console.log(`Kucoin data updated in ${Date.now() - time}ms`);
};

const getAccountInfo = async ({ credentials }) => {
    console.log('Getting Kucoin account informations...');
    const kc = new Kucoin(credentials.apiKey, credentials.apiSecret);
    const promises = [];
    let accountInfo;
    try {
        accountInfo = await kc.getBalance();
        const formattedResult = {
            balances: accountInfo.data.map(item => ({ asset: item.coinType, free: item.balance, locked: item.freezeBalance })),
        };
        formattedResult.balances.filter(item => (item.free > 0.001 || item.locked > 0.001)).map((balanceItem) => {
            const pair = balanceItem.asset === 'ETH' || balanceItem.asset === 'BTC' ? `${balanceItem.asset}-USDT` : `${balanceItem.asset}-ETH`;
            return promises.push(kc.getDealtOrders({ pair }));
        });

        try {
            formattedResult.orders = await Promise.all(promises);
            formattedResult.orders = formattedResult.orders
                .filter(itemFilter => itemFilter.data.datas.length > 0)
                .map(item => item.data.datas)
                .map(itemMapArray => itemMapArray.map(itemMap => ({ ...itemMap, pair: `${itemMap.coinType}${itemMap.coinTypePair}` })));
            return Promise.resolve(formattedResult);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    } catch (error) {
        console.log('Kucoin.getAccountInfo:', error);
        return Promise.reject(error);
    }
};

module.exports = {
    getData,
    getAccountInfo,
};
