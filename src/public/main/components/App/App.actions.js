import localStorageConstants from 'constants/localStorage.constants';
import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';

const states = {
    CRYPTO_GO_TO_LOADING: 'CRYPTO_GO_TO_LOADING',
    CRYPTO_REDIRECT_TO_LOGIN: 'CRYPTO_REDIRECT_TO_LOGIN',
    REQUEST_LOGOUT: 'REQUEST_LOGOUT',
};

const requestLogout = () => ({ type: states.REQUEST_LOGOUT, userAuthenticated: false });
const requestGoToLogin = () => ({ type: states.CRYPTO_GO_TO_LOADING, loadingApp: true });
const requestRedirectToLogin = () => ({ type: states.CRYPTO_REDIRECT_TO_LOGIN, loadingApp: false });

const logout = () => (dispatch) => {
    dispatch(requestLogout());
    window.localStorage.removeItem(localStorageConstants.accessToken);
    window.localStorage.removeItem(localStorageConstants.userId);
    dispatch(push(paths.public.login));
};

const goToLoading = () => (dispatch) => {
    dispatch(requestGoToLogin());
    dispatch(push(paths.public.loading));
};

const redirectToLogin = () => (dispatch) => {
    dispatch(requestRedirectToLogin());
    dispatch(push(paths.public.login));
};

export default {
    states,
    logout,
    goToLoading,
    redirectToLogin,
};
