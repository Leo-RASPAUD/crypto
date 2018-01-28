/* eslint no-undef: 0 */
const initEnvironmentVariables = () => fetch('/getApiParams')
    .then(response => response.json())
    .then((data) => {
        window.DEBUG_REACT = data.debug_react;
        window.API_HOST = `${data.host}:${data.port}`;
    });

export default {
    initEnvironmentVariables,
};
