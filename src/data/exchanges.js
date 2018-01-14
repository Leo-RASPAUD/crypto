const Exchange = require('../models/Exchange/Exchange');

const sortByName = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

const list = async (req, res) => {
    let exchanges;
    try {
        exchanges = await Exchange.find();
        return res.send(exchanges);
    } catch (error) {
        console.log(`Error while trying to get the exchanges ${error}`);
        return res.status(500).json({ _error: `Error code : ${error.code}` });
    }
};

const getSymbols = async (req, res) => {
    let exchange;
    const exchangeName = req.params.name;
    try {
        exchange = await Exchange.findOne({ name: exchangeName }).populate('symbols');
        exchange.symbols.sort(sortByName);
        return res.send(exchange);
    } catch (error) {
        console.log(`Error while trying to get the exchange ${exchangeName} ${error}`);
        return res.status(500).json({ _error: `Error code : ${error.code}` });
    }
};

module.exports = {
    list,
    getSymbols,
};
