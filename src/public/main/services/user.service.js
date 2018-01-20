import httpUtils from 'utils/httpUtils';
import endpoints from 'utils/endpoints';
import httpConstants from 'constants/http.constants';

const login = credentials => httpUtils.post({ type: httpConstants.json.type, body: credentials, url: endpoints.userEndpoints.login });
const getUserDetails = userId => httpUtils.get({ url: endpoints.userEndpoints.getUserDetails(userId) });

export default {
    login,
    getUserDetails,
};
