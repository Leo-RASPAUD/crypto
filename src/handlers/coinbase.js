const Client = require('coinbase').Client;
const axios = require('axios');
const Price = require('../models/Price/Price');

const baseUrl = 'https://api.coinbase.com/v2/exchange-rates?currency=';

const getData = async () => {
    console.log('Refresh Coinbase data ...');
    const time = Date.now();
    const fiat = ['ETH', 'LTC', 'BCH', 'BTC'];
    const promises = [];
    fiat.map(item => promises.push(axios.get(`${baseUrl}${item}`)));

    try {
        const results = await Promise.all(promises);
        const formattedResults = results.map(result => result.data.data.rates.USD);
        const priceObject = {
            exchange: 'Coinbase',
            time,
            symbols: [
                { name: 'ETHUSDT', value: formattedResults[0] },
                { name: 'LTCUSDT', value: formattedResults[1] },
                { name: 'BCHUSDT', value: formattedResults[2] },
                { name: 'BTCUSDT', value: formattedResults[3] },
            ],
        };
        const price = new Price(priceObject);
        price.save();
        console.log(`Coinbase data updated in ${Date.now() - time}ms`);
    } catch (error) {
        console.log('Error while refreshing coinbase informations');
        console.log(error);
    }
};

const getAccountInfo = async ({ credentials }) => {
    console.log('Getting Coinbase account informations...');
    const clientCoinbase = new Client({ apiKey: credentials.apiKey, apiSecret: credentials.apiSecret });
    const returnObject = {
        balances: [],
    };
    return new Promise((resolve, reject) => {
        clientCoinbase.getAccounts({}, (error, accounts) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            const { length } = accounts;
            for (let index = 0; index < length; index += 1) {
                const element = accounts[index];
                returnObject.balances.push({
                    asset: element.currency,
                    free: element.balance.amount,
                    locked: 0,
                });
            }
            resolve(returnObject);
        });
    });
    // const symbolKeys = Object.keys(prices);
    // let accountInfo;
    // const promises = [];
    // try {
    //     accountInfo = await clientCoinbase.accountInfo();
    //     accountInfo.balances.filter(item => (item.free > 0.001 || item.locked > 0.001)).map((balanceItem) => {
    //         let symbol;
    //         if (symbolKeys.includes(`${balanceItem.asset}ETH`)) {
    //             symbol = `${balanceItem.asset}ETH`;
    //         } else {
    //             symbol = symbolKeys.includes(`${balanceItem.asset}USDT`) ? `${balanceItem.asset}USDT` : `ETH${balanceItem.asset}`;
    //         }
    //         return promises.push(clientCoinbase.allOrders({ symbol }));
    //     });
    //     try {
    //         accountInfo.orders = await Promise.all(promises);
    //         accountInfo.orders = accountInfo.orders
    //             .map(order => order.filter(item => item.side === 'BUY'))
    //             .map(itemMapArray => itemMapArray.map(itemMap => ({ ...itemMap, dealPrice: itemMap.price, pair: itemMap.symbol })));
    //         return Promise.resolve(accountInfo);
    //     } catch (error) {
    //         console.log(error);
    //         return Promise.reject(error);
    //     }
    // } catch (error) {
    //     console.log('Coinbase.getAccountInfo:', error);
    //     return Promise.reject(error);
    // }
};


module.exports = {
    getData,
    getAccountInfo,
};

