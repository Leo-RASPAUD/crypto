import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';
import { SubmissionError } from 'redux-form';
import userService from 'services/user.service';
import localStorageConstants from 'constants/localStorage.constants';
import snackbarTypes from 'utils/snackbarTypes';

const states = {
    CRYPTO_REQUEST_LOGIN_LOADING: 'CRYPTO_REQUEST_LOGIN_LOADING',
    CRYPTO_REQUEST_LOGIN_SUCCESS: 'CRYPTO_REQUEST_LOGIN_SUCCESS',
    CRYPTO_REQUEST_LOGIN_FAILURE: 'CRYPTO_REQUEST_LOGIN_FAILURE',
    CRYPTO_CREATE_USER_LOADING: 'CRYPTO_CREATE_USER_LOADING',
    CRYPTO_CREATE_USER_SUCCESS: 'CRYPTO_CREATE_USER_SUCCESS',
    CRYPTO_CREATE_USER_FAILURE: 'CRYPTO_CREATE_USER_FAILURE',
};

const requestSubmitLogin = () => ({ type: states.CRYPTO_REQUEST_LOGIN_LOADING });
const receiveLoginSuccess = ({ user }) => ({ type: states.CRYPTO_REQUEST_LOGIN_SUCCESS, user });
const receiveLoginFailure = () => ({ type: states.CRYPTO_REQUEST_LOGIN_FAILURE, user: null });
const createUserLoading = () => ({ type: states.CRYPTO_CREATE_USER_LOADING });
const createUserSuccess = ({ user }) => ({ type: states.CRYPTO_CREATE_USER_SUCCESS, user });
const createUserError = () => ({ type: states.CRYPTO_CREATE_USER_FAILURE });
const displaySnackbar = ({ message, type }) => ({
    type: 'CRYPTO_REQUEST_SHOW_SNACKBAR',
    isSnackbarDisplayed: true,
    snackbarMessage: message,
    snackbarType: type,
});

const submitLogin = credentials => async (dispatch) => {
    dispatch(requestSubmitLogin());
    let status;
    let json;
    try {
        ({ status, json } = await userService.login({ ...credentials, email: credentials.email.toLowerCase() }));
    } catch (error) {
        dispatch(receiveLoginFailure());
        const errorMessage = 'Error while trying to login';
        dispatch(displaySnackbar({ message: errorMessage, type: snackbarTypes.ERROR }));
        throw new SubmissionError({ _error: errorMessage });
    }
    if (status !== 200) {
        dispatch(receiveLoginFailure());
        throw new SubmissionError({ _error: json.message });
    } else {
        window.localStorage.setItem(localStorageConstants.userId, json._id);
        window.localStorage.setItem(localStorageConstants.token, json.token);
        dispatch(receiveLoginSuccess({ user: json }));
        dispatch(displaySnackbar({ message: 'Welcome back', type: snackbarTypes.SUCCESS }));
        dispatch(push(paths.authenticated.dashboard));
    }
};

const createUser = ({ credentials }) => async (dispatch) => {
    dispatch(createUserLoading());
    let status;
    let json;
    try {
        ({ json, status } = await userService.createUser({ credentials }));
    } catch (error) {
        const errorMessage = 'Error while trying to create a user';
        dispatch(displaySnackbar({ message: errorMessage, type: snackbarTypes.ERROR }));
        dispatch(createUserError());
        throw new SubmissionError({ _error: errorMessage });
    }
    if (status !== 200) {
        dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
        dispatch(createUserError());
    } else {
        dispatch(displaySnackbar({ message: 'User created successfully', type: snackbarTypes.SUCCESS }));
        window.localStorage.setItem(localStorageConstants.userId, json._id);
        window.localStorage.setItem(localStorageConstants.token, json.token);
        dispatch(displaySnackbar({ message: 'Welcome', type: snackbarTypes.SUCCESS }));
        dispatch(createUserSuccess({ user: json }));
        dispatch(push(paths.authenticated.dashboard));
    }
};

export default {
    submitLogin,
    states,
    createUser,
};
