const baseUser = '/user';
const baseExchange = '/exchange';

const userEndpoints = {
    login: '/login',
    getUserDetails: id => `${baseUser}/${id}`,
};

const exchangeEndpoints = {
    getSymbols: name => `${baseExchange}/${name}/Symbol`,
    getAccountInfo: name => `${baseExchange}/${name}/accountInformations`,
    getPrices: ({ exchangeName, symbol }) => `${baseExchange}/${exchangeName}/Price/${symbol}`,
};

export default {
    userEndpoints,
    exchangeEndpoints,
};
