const baseUser = '/user';
const baseExchange = '/exchange';

const userEndpoints = {
    login: '/login',
    getUserDetails: id => `${baseUser}/${id}`,
    getAccountInfo: id => `${baseUser}/${id}/accountInfo`,
};

const exchangeEndpoints = {
    getSymbols: name => `${baseExchange}/${name}`,
};

export default {
    userEndpoints,
    exchangeEndpoints,
};
