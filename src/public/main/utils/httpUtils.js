import localStorageConstants from 'constants/localStorage.constants';
import httpConstants from 'constants/http.constants';

const protocol = window.location.protocol !== 'https:' ? window.location.protocol : 'https:';
const fetchUrl = (url, params) => fetch(`${protocol}//${window.API_HOST}${url}`, params);

const getAuthHeader = () => {
    const accessToken = window.localStorage.getItem(localStorageConstants.accessToken);
    if (accessToken) {
        return { Authorization: `Bearer ${accessToken}` };
    }
    return null;
};

/* eslint indent:0 */
const getTypeHeader = (type) => {
    switch (type) {
        case httpConstants.json.type:
            return httpConstants.json.value;
        case httpConstants.formData.type:
            return httpConstants.formData.value;
        default:
            return httpConstants.json.value;
    }
};

const post = ({ type, body, url, isAuth }) => {
    const headers = {
        ...(isAuth ? getAuthHeader() : {}),
    };
    headers[httpConstants.contentType] = getTypeHeader(type);

    const params = {
        method: httpConstants.requestTypes.post,
        headers,
        body: type === httpConstants.formData.type ? body : JSON.stringify(body),
    };
    return fetchUrl(url, params).then(response => response.json().then(json => ({ status: response.status, json })));
};

const get = ({ url, isAuth }) => {
    const headers = {
        ...(isAuth ? getAuthHeader() : {}),
    };
    headers[httpConstants.contentType] = httpConstants.json.value;
    const params = {
        method: httpConstants.requestTypes.get,
        headers,
    };
    return fetchUrl(url, params).then(response => response.json().then(json => ({ status: response.status, json })));
};

const patch = ({ body, url, isAuth }) => {
    const headers = {
        ...(isAuth ? getAuthHeader() : {}),
    };
    headers[httpConstants.contentType] = httpConstants.json.value;

    const params = {
        method: httpConstants.requestTypes.patch,
        headers,
        body: JSON.stringify(body),
    };
    return fetchUrl(url, params).then(response => response.json().then(json => ({ status: response.status, json })));
};

export default {
    post,
    get,
    patch,
};

