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
};

module.exports = {
    getData,
    getAccountInfo,
};
