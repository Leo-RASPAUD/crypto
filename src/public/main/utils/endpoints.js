const baseUser = '/user';
const baseExchange = '/exchange';

const userEndpoints = {
    login: '/login',
    createUser: baseUser,
    getUserDetails: id => `${baseUser}/${id}`,
    addExchange: id => `${baseUser}/${id}/addExchange`,
    removeExchange: ({ userId, exchangeName }) => `${baseUser}/${userId}/exchange/${exchangeName}`,
};

const exchangeEndpoints = {
    getSymbols: name => `${baseExchange}/${name}/Symbol`,
    getExchanges: `${baseExchange}/`,
    getAccountInfo: name => `${baseExchange}/${name}/accountInformations`,
    getPrices: ({ exchangeName, symbol }) => `${baseExchange}/${exchangeName}/Price/${symbol}`,
    getTrend: ({ exchangeName, symbol }) => `${baseExchange}/${exchangeName}/Price/${symbol}/Trend`,
    getLastPrice: ({ exchangeName, symbol }) => `${baseExchange}/${exchangeName}/Price/${symbol}/lastPrice`,
};

export default {
    userEndpoints,
    exchangeEndpoints,
};
