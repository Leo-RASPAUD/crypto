const Price = require('../models/Price/Price');
const exchangeUtils = require('./utils/exchangeUtils');

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
        res.send({ exchange: exchangeName, symbols: prices.symbols.map(symbol => symbol.name).sort() });
    } catch (error) {
        console.log(`Error while trying to get the symbols ${exchangeName} ${error}`);
        res.sendStatus(500).json({ _error: `Error code : ${error.code}` });
    }
};

/* eslint-disable no-confusing-arrow */
const getPrices = async (req, res) => {
    const { name, symbol } = req.params;
    try {
        const prices = await Price.aggregate([
            { $match: { exchange: name } },
            {
                $project: {
                    items: {
                        $filter: {
                            input: '$symbols',
                            as: 'symbol',
                            cond: { $eq: ['$$symbol.name', symbol] },
                        },
                    },
                    time: '$time',
                },
            },
        ]);

        const priceObject = prices.map((item) => {
            const isItem = item.items[0];
            const date = new Date(item.time);
            const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            if (isItem) {
                return { value: Number.parseFloat(isItem.value), time: formattedDate };
            }
            return { time: item.time, value: 0 };
        });
        res.send({ symbol, prices: priceObject });
    } catch (error) {
        console.log(`Error while trying to get the symbols ${name} ${error}`);
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
