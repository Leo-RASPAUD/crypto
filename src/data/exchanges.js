const Exchange = require('../models/Exchange/Exchange');

const list = async (req, res) => {
    let exchanges;
    try {
        exchanges = await Exchange.find();
        res.send(exchanges);
    } catch (error) {
        console.log(`Error while trying to get the exchanges ${error}`);
        return res.status(500).json({ _error: `Error code : ${error.code}` });
    }
};

module.exports = {
    list,
};
