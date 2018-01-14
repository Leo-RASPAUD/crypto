import httpConstants from 'constants/http.constants';

const protocol = window.location.protocol !== 'https:' ? window.location.protocol : 'https:';
const fetchUrl = (url, params) => fetch(`${protocol}//${window.API_HOST}${url}`, params);

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

const post = ({ type, body, url }) => {
    const headers = {};
    headers[httpConstants.contentType] = getTypeHeader(type);

    const params = {
        method: httpConstants.requestTypes.post,
        headers,
        credentials: 'include',
        body: type === httpConstants.formData.type ? body : JSON.stringify(body),
    };
    return fetchUrl(url, params).then(response => response.json().then(json => ({ status: response.status, json })));
};

const get = ({ url }) => {
    const headers = {};
    headers[httpConstants.contentType] = httpConstants.json.value;
    const params = {
        method: httpConstants.requestTypes.get,
        headers,
        credentials: 'include',
    };
    return fetchUrl(url, params).then(response => response.json().then(json => ({ status: response.status, json })));
};

const patch = ({ body, url }) => {
    const headers = {};
    headers[httpConstants.contentType] = httpConstants.json.value;

    const params = {
        method: httpConstants.requestTypes.patch,
        headers,
        credentials: 'include',
        body: JSON.stringify(body),
    };
    return fetchUrl(url, params).then(response => response.json().then(json => ({ status: response.status, json })));
};

export default {
    post,
    get,
    patch,
};

