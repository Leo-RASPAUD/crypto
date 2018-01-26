import localStorageConstants from 'constants/localStorage.constants';
import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';
import snackbarTypes from 'utils/snackbarTypes';
import userService from 'services/user.service';

const states = {
    CRYPTO_REDIRECT_TO_LOGIN: 'CRYPTO_REDIRECT_TO_LOGIN',
    CRYPTO_REDIRECT_TO_PROFILE: 'CRYPTO_REDIRECT_TO_PROFILE',
    CRYPTO_REDIRECT_TO_DASHBOARD: 'CRYPTO_REDIRECT_TO_DASHBOARD',
    CRYPTO_REQUEST_CHECK_CREDENTIALS_LOADING: 'CRYPTO_REQUEST_CHECK_CREDENTIALS_LOADING',
    CRYPTO_REQUEST_CHECK_CREDENTIALS_SUCCESS: 'CRYPTO_REQUEST_CHECK_CREDENTIALS_SUCCESS',
    CRYPTO_REQUEST_CHECK_CREDENTIALS_FAILURE: 'CRYPTO_REQUEST_CHECK_CREDENTIALS_FAILURE',
    CRYPTO_REQUEST_LOGOUT: 'CRYPTO_REQUEST_LOGOUT',
};


const requestLogout = () => ({ type: states.CRYPTO_REQUEST_LOGOUT });
const requestCheckCredentialsLoading = () => ({ type: states.CRYPTO_REQUEST_CHECK_CREDENTIALS_LOADING });
const requestCheckCredentialsSuccess = ({ user }) => ({ type: states.CRYPTO_REQUEST_CHECK_CREDENTIALS_SUCCESS, user });
const requestCheckCredentialsFailure = () => ({ type: states.CRYPTO_REQUEST_CHECK_CREDENTIALS_FAILURE, user: null });
const requestGoToProfile = () => ({ type: states.CRYPTO_REDIRECT_TO_PROFILE });
const requestGoToDashboard = () => ({ type: states.CRYPTO_REDIRECT_TO_DASHBOARD });
const displaySnackbar = ({ message, type }) => ({
    type: 'CRYPTO_REQUEST_SHOW_SNACKBAR',
    isSnackbarDisplayed: true,
    snackbarMessage: message,
    snackbarType: type,
});

const logout = () => (dispatch) => {
    window.localStorage.removeItem(localStorageConstants.token);
    window.localStorage.removeItem(localStorageConstants.userId);
    dispatch(push(paths.public.login));
    dispatch(requestLogout());
};

const goToDashboard = () => (dispatch) => {
    dispatch(requestGoToDashboard());
    dispatch(push(paths.authenticated.dashboard));
};

const goToProfile = () => (dispatch) => {
    dispatch(requestGoToProfile());
    dispatch(push(paths.authenticated.profile));
};

const checkCredentials = () => async (dispatch) => {
    const userId = window.localStorage.getItem(localStorageConstants.userId);
    if (userId) {
        dispatch(requestCheckCredentialsLoading());
        let status;
        let json;
        try {
            ({ status, json } = await userService.getUserDetails(userId));
        } catch (error) {
            window.localStorage.removeItem(localStorageConstants.userId);
            dispatch(requestCheckCredentialsFailure());
            dispatch(displaySnackbar({ message: error.message, type: snackbarTypes.ERROR }));
            dispatch(push(paths.public.login));
        }
        if (status !== 200) {
            window.localStorage.removeItem(localStorageConstants.userId);
            dispatch(requestCheckCredentialsFailure());
            dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
            dispatch(push(paths.public.login));
        } else {
            dispatch(requestCheckCredentialsSuccess({ user: json }));
            dispatch(displaySnackbar({ message: 'Welcome back', type: snackbarTypes.SUCCESS }));
            dispatch(push(paths.authenticated.dashboard));
        }
    } else {
        dispatch(requestCheckCredentialsFailure());
        window.localStorage.removeItem(localStorageConstants.token);
        dispatch(push(paths.public.login));
    }
};

export default {
    states,
    logout,
    goToDashboard,
    goToProfile,
    checkCredentials,
};
