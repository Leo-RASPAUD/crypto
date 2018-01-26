import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';
import { SubmissionError } from 'redux-form';
import userService from 'services/user.service';
import localStorageConstants from 'constants/localStorage.constants';
import snackbarTypes from 'utils/snackbarTypes';

const states = {
    CRYPTO_REQUEST_SUBMIT_LOGIN: 'CRYPTO_REQUEST_SUBMIT_LOGIN',
    CRYPTO_RECEIVE_LOGIN_SUCCESSFUL: 'CRYPTO_RECEIVE_LOGIN_SUCCESSFUL',
    CRYPTO_REQUEST_SHOW_SNACKBAR: 'CRYPTO_REQUEST_SHOW_SNACKBAR',
    CRYPTO_CREATE_USER_LOADING: 'CRYPTO_CREATE_USER_LOADING',
    CRYPTO_CREATE_USER_SUCCESS: 'CRYPTO_CREATE_USER_SUCCESS',
    CRYPTO_CREATE_USER_FAILURE: 'CRYPTO_CREATE_USER_FAILURE',
};

const requestSubmitLogin = () => ({ type: states.CRYPTO_REQUEST_SUBMIT_LOGIN });
const receiveLoginSuccess = () => ({ type: states.CRYPTO_RECEIVE_LOGIN_SUCCESSFUL, loadingApp: true });
const createUserLoading = () => ({ type: states.CRYPTO_CREATE_USER_LOADING });
const createUserSuccess = () => ({ type: states.CRYPTO_CREATE_USER_SUCCESS });
const createUserError = () => ({ type: states.CRYPTO_CREATE_USER_FAILURE });
const displaySnackbar = ({ message, type }) => ({
    type: states.CRYPTO_REQUEST_SHOW_SNACKBAR,
    isSnackbarDisplayed: true,
    snackbarMessage: message,
    snackbarType: type,
});

const submitLogin = credentials => async (dispatch) => {
    dispatch(requestSubmitLogin());
    try {
        const { status, json } = await userService.login({ ...credentials, email: credentials.email.toLowerCase() });
        if (status !== 200) {
            throw new SubmissionError({ _error: json.message });
        } else {
            window.localStorage.setItem(localStorageConstants.userId, json._id);
            window.localStorage.setItem(localStorageConstants.token, json.token);
            dispatch(receiveLoginSuccess());
            dispatch(push(paths.public.loading));
        }
    } catch (error) {
        const errorMessage = 'Error while trying to login';
        dispatch(displaySnackbar({ message: errorMessage, type: snackbarTypes.ERROR }));
        throw new SubmissionError({ _error: errorMessage });
    }
};

const createUser = ({ credentials }) => async (dispatch) => {
    dispatch(createUserLoading());
    try {
        const { json, status } = await userService.createUser({ credentials });
        if (status !== 200) {
            dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
            dispatch(createUserError());
        } else {
            dispatch(displaySnackbar({ message: 'User created successfully', type: snackbarTypes.SUCCESS }));
            dispatch(createUserSuccess({ exchanges: json.exchanges }));
            window.localStorage.setItem(localStorageConstants.userId, json._id);
            window.localStorage.setItem(localStorageConstants.token, json.token);
            dispatch(push(paths.public.loading));
        }
    } catch (error) {
        const errorMessage = 'Error while trying to create a user';
        dispatch(displaySnackbar({ message: errorMessage, type: snackbarTypes.ERROR }));
        dispatch(createUserError());
        throw new SubmissionError({ _error: errorMessage });
    }
};

export default {
    submitLogin,
    states,
    createUser,
};
