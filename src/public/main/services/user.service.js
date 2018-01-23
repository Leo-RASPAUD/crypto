import httpUtils from 'utils/httpUtils';
import endpoints from 'utils/endpoints';
import httpConstants from 'constants/http.constants';

const login = credentials => httpUtils.post({ type: httpConstants.json.type, body: credentials, url: endpoints.userEndpoints.login });
const createUser = ({ credentials }) => httpUtils.post({ type: httpConstants.json.type, body: credentials, url: endpoints.userEndpoints.createUser });
const addExchange = ({ userId, exchange }) => httpUtils.post({ type: httpConstants.json.type, body: exchange, url: endpoints.userEndpoints.addExchange(userId) });
const removeExchange = ({ userId, exchangeName }) => httpUtils.deleteHttp({ type: httpConstants.json.type, url: endpoints.userEndpoints.removeExchange({ userId, exchangeName }) });
const getUserDetails = userId => httpUtils.get({ url: endpoints.userEndpoints.getUserDetails(userId) });

export default {
    login,
    createUser,
    getUserDetails,
    addExchange,
    removeExchange,
};
