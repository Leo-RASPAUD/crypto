import localStorageConstants from 'constants/localStorage.constants';
import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';

const states = {
    CRYPTO_GO_TO_LOADING: 'CRYPTO_GO_TO_LOADING',
    CRYPTO_REDIRECT_TO_LOGIN: 'CRYPTO_REDIRECT_TO_LOGIN',
    CRYPTO_REDIRECT_TO_PROFILE: 'CRYPTO_REDIRECT_TO_PROFILE',
    CRYPTO_REDIRECT_TO_DASHBOARD: 'CRYPTO_REDIRECT_TO_DASHBOARD',
    REQUEST_LOGOUT: 'REQUEST_LOGOUT',
};

const requestLogout = () => ({ type: states.REQUEST_LOGOUT, userAuthenticated: false });
const requestGoToLoading = () => ({ type: states.CRYPTO_GO_TO_LOADING, loadingApp: true });
const requestGoToProfile = () => ({ type: states.CRYPTO_REDIRECT_TO_PROFILE });
const requestGoToDashboard = () => ({ type: states.CRYPTO_REDIRECT_TO_DASHBOARD });
const requestRedirectToLogin = () => ({ type: states.CRYPTO_REDIRECT_TO_LOGIN, loadingApp: false });

const logout = () => (dispatch) => {
    dispatch(requestLogout());
    window.localStorage.removeItem(localStorageConstants.accessToken);
    window.localStorage.removeItem(localStorageConstants.userId);
    dispatch(push(paths.public.login));
};

const goToLoading = () => (dispatch) => {
    dispatch(requestGoToLoading());
    dispatch(push(paths.public.loading));
};

const goToDashboard = () => (dispatch) => {
    dispatch(requestGoToDashboard());
    dispatch(push(paths.authenticated.dashboard));
};

const goToProfile = () => (dispatch) => {
    dispatch(requestGoToProfile());
    dispatch(push(paths.authenticated.profile));
};

const redirectToLogin = () => (dispatch) => {
    dispatch(requestRedirectToLogin());
    dispatch(push(paths.public.login));
};

export default {
    states,
    logout,
    goToLoading,
    goToDashboard,
    goToProfile,
    redirectToLogin,
};
