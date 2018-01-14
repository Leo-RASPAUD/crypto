import httpUtils from 'utils/httpUtils';
import endpoints from 'utils/endpoints';

const getSymbols = name => httpUtils.get({ url: endpoints.exchangeEndpoints.getSymbols(name), isAuth: true });

export default {
    getSymbols,
};
