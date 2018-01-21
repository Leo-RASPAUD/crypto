import httpUtils from 'utils/httpUtils';
import endpoints from 'utils/endpoints';
import httpConstants from 'constants/http.constants';

const getSymbols = name => httpUtils.get({ url: endpoints.exchangeEndpoints.getSymbols(name) });
const getPrices = ({ exchangeName, symbol }) => httpUtils.get({ url: endpoints.exchangeEndpoints.getPrices({ exchangeName, symbol }) });
const getTrend = ({ exchangeName, symbol }) => httpUtils.get({ url: endpoints.exchangeEndpoints.getTrend({ exchangeName, symbol }) });
const getLastPrice = ({ exchangeName, symbol }) => httpUtils.get({ url: endpoints.exchangeEndpoints.getLastPrice({ exchangeName, symbol }) });
const getAccountInfo = ({ exchange }) => httpUtils.post({ type: httpConstants.json, body: exchange, url: endpoints.exchangeEndpoints.getAccountInfo(exchange.name) });


export default {
    getSymbols,
    getPrices,
    getTrend,
    getAccountInfo,
    getLastPrice,
};
