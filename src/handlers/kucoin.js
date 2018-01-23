const Kucoin = require('kucoin-api');
const Price = require('../models/Price/Price');

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

const getData = async () => {
    console.log('Refresh Kucoin data ...');
    const time = Date.now();
    const kc = new Kucoin();
    const prices = await kc.getTicker({ pair: '' });
    const { length } = prices.data;

    const priceObject = {
        exchange: 'Kucoin',
        time,
        symbols: [],
    };

    for (let index = 0; index < length; index += 1) {
        const element = prices.data[index];
        priceObject.symbols.push({
            name: element.symbol.replace('-', ''),
            value: element.lastDealPrice,
        });
    }

    const price = new Price(priceObject);
    price.save();

    console.log(`Kucoin data updated in ${Date.now() - time}ms`);
};

const getAccountInfo = async ({ credentials }) => {
    console.log('Getting Kucoin account informations...');
    const kc = new Kucoin(credentials.apiKey, credentials.apiSecret);
    const promises = [];
    let accountInfo;
    try {
        accountInfo = await kc.getBalance();
        await delay(1000);
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

async function sleep(fn, ...args) {
    await timeout(3000);
    return fn(...args);
}

module.exports = {
    getData,
    getAccountInfo,
};
