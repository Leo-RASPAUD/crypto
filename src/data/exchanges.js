const Price = require('../models/Price/Price');

const sortByName = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
};

const list = async (req, res) => {
    let exchanges;
    try {
        exchanges = await Price.find({ distinct: 'exchange' });
        return res.send(exchanges);
    } catch (error) {
        console.log(`Error while trying to get the exchanges ${error}`);
        return res.status(500).json({ _error: `Error code : ${error.code}` });
    }
};

const getSymbols = async (req, res) => {
    const exchangeName = req.params.name;
    try {
        const prices = await Price.find({ exchange: exchangeName });
        const symbols = [];
        const { length } = prices;
        for (let index = 0; index < length; index += 1) {
            const element = prices[index];
            const symbolName = element.symbol;
            const isPresent = symbols.find(symbol => symbol.name === symbolName);
            if (!isPresent) {
                symbols.push({ name: symbolName, prices: [{ value: element.value, time: element.time }] });
            } else {
                isPresent.prices.push({ value: element.value, time: element.time });
            }
        }
        res.send({ symbols: symbols.sort(sortByName), name: exchangeName });
    } catch (error) {
        console.log(`Error while trying to get the symbols ${exchangeName} ${error}`);
        res.sendStatus(500).json({ _error: `Error code : ${error.code}` });
    }
};

module.exports = {
    list,
    getSymbols,
};
