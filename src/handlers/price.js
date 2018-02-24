const Price = require('../models/Price/Price');

const cleanDb = () => {
    console.log('Removing data older than 24 hours ...');
    Price.remove({ time: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } });
};

module.exports = {
    cleanDb,
};
