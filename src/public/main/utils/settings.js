/* eslint no-undef: 0 */
const initEnvironmentVariables = () => fetch('/getApiParams')
    .then(response => response.json())
    .then((data) => {
        window.API_HOST = data.host;
    });

export default {
    initEnvironmentVariables,
};
