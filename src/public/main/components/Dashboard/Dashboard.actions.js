import exchangeService from 'services/exchange.service';

const getSymbols = exchangeNames => async () => {
    const { length } = exchangeNames;
    const promises = [];
    for (let index = 0; index < length; index += 1) {
        const element = exchangeNames[index];
        promises.push(exchangeService.getSymbols(element.name));
    }
    try {
        const results = await Promise.all(promises);
        return results.map(result => result.json);
    } catch (error) {
        console.log('Error while getting the symbols');
        return [];
    }
};

const getPrices = ({ exchangeName, symbol }) => async () => {
    try {
        const { json, status } = await exchangeService.getPrices({ exchangeName, symbol });
        if (status !== 200) {
            throw new Error('Error while getting the symbols');
        }
        return json;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getTrend = ({ exchangeName, symbol }) => async () => {
    try {
        const { json, status } = await exchangeService.getTrend({ exchangeName, symbol });
        if (status !== 200) {
            throw new Error('Error while getting the trends');
        }
        return json;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getLastPrice = ({ exchangeName, symbol }) => async () => {
    try {
        const { json, status } = await exchangeService.getLastPrice({ exchangeName, symbol });
        if (status !== 200) {
            throw new Error('Error while getting the last price');
        }
        return json;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default {
    getSymbols,
    getPrices,
    getTrend,
    getLastPrice,
};

