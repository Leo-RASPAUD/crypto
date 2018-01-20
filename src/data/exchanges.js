const Price = require('../models/Price/Price');
const exchangeUtils = require('./utils/exchangeUtils');

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
        const prices = await Price.findOne({ exchange: exchangeName }).sort({ time: -1 }).limit(1).lean();
        res.send({ exchange: exchangeName, symbols: prices.symbols.map(symbol => symbol.name).sort(sortByName) });
    } catch (error) {
        console.log(`Error while trying to get the symbols ${exchangeName} ${error}`);
        res.sendStatus(500).json({ _error: `Error code : ${error.code}` });
    }
};

/* eslint-disable no-confusing-arrow */
const getPrices = async (req, res) => {
    const { exchangeName, symbol } = req.params;
    try {
        const prices = await Price.aggregate([
            {
                $project: {
                    items: {
                        $filter: {
                            input: '$symbols',
                            as: 'symbol',
                            cond: { $eq: ['$$symbol.name', 'ETHUSDT'] },
                        },
                    },
                },
            },
        ]);
        res.send({ symbol, prices: prices.map(item => item.items[0] ? Number.parseFloat(item.items[0].value) : 0) });
    } catch (error) {
        console.log(`Error while trying to get the symbols ${exchangeName} ${error}`);
        res.sendStatus(500).json({ _error: `Error code : ${error.code}` });
    }
};

const getAccountInfo = async (req, res) => {
    const exchangeName = req.params.name;
    const handler = exchangeUtils.getHandler(exchangeName);
    try {
        const infos = await handler.getAccountInfo({ credentials: req.body });
        res.send({ name: exchangeName, data: infos });
    } catch (error) {
        res.status(500).json({ message: `Error code : ${error.code}` });
    }
};

module.exports = {
    list,
    getSymbols,
    getPrices,
    getAccountInfo,
};
