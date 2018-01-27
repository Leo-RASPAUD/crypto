import localStorageConstants from 'constants/localStorage.constants';
import exchangeService from 'services/exchange.service';
import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';
import snackbarTypes from 'utils/snackbarTypes';
import userService from 'services/user.service';

const states = {
    CRYPTO_GET_EXCHANGES_LOADING: 'CRYPTO_GET_EXCHANGES_LOADING',
    CRYPTO_GET_EXCHANGES_SUCCESS: 'CRYPTO_GET_EXCHANGES_SUCCESS',
    CRYPTO_GET_EXCHANGES_FAILURE: 'CRYPTO_GET_EXCHANGES_FAILURE',
    CRYPTO_ADD_EXCHANGE_SUCCESS: 'CRYPTO_ADD_EXCHANGE_SUCCESS',
    CRYPTO_ADD_EXCHANGE_LOADING: 'CRYPTO_ADD_EXCHANGE_LOADING',
    CRYPTO_ADD_EXCHANGE_FAILURE: 'CRYPTO_ADD_EXCHANGE_FAILURE',
    CRYPTO_REMOVE_EXCHANGE_SUCCESS: 'CRYPTO_REMOVE_EXCHANGE_SUCCESS',
    CRYPTO_REMOVE_EXCHANGE_LOADING: 'CRYPTO_REMOVE_EXCHANGE_LOADING',
    CRYPTO_REMOVE_EXCHANGE_FAILURE: 'CRYPTO_REMOVE_EXCHANGE_FAILURE',
    CRYPTO_GET_USER_DETAILS_SUCCESS: 'CRYPTO_GET_USER_DETAILS_SUCCESS',
    CRYPTO_GET_USER_DETAILS_LOADING: 'CRYPTO_GET_USER_DETAILS_LOADING',
    CRYPTO_GET_USER_DETAILS_FAILURE: 'CRYPTO_GET_USER_DETAILS_FAILURE',
};

const getExchangesLoading = () => ({ type: states.CRYPTO_GET_EXCHANGES_LOADING });
const getExchangesSuccess = ({ exchanges }) => ({ type: states.CRYPTO_GET_EXCHANGES_SUCCESS, exchanges });
const getExchangesFailure = () => ({ type: states.CRYPTO_GET_EXCHANGES_FAILURE });
const getUserDetailsLoading = () => ({ type: states.CRYPTO_GET_USER_DETAILS_LOADING });
const getUserDetailsSuccess = ({ user }) => ({ type: states.CRYPTO_GET_USER_DETAILS_SUCCESS, user });
const getUserDetailsFailure = () => ({ type: states.CRYPTO_GET_USER_DETAILS_FAILURE });
const addExchangeLoading = () => ({ type: states.CRYPTO_ADD_EXCHANGE_LOADING });
const addExchangeSuccess = ({ exchange }) => ({ type: states.CRYPTO_ADD_EXCHANGE_SUCCESS, exchange });
const addExchangeError = () => ({ type: states.CRYPTO_ADD_EXCHANGE_FAILURE });
const removeExchangeLoading = () => ({ type: states.CRYPTO_REMOVE_EXCHANGE_LOADING });
const removeExchangeSuccess = ({ exchangeName }) => ({ type: states.CRYPTO_REMOVE_EXCHANGE_SUCCESS, exchangeName });
const removeExchangeError = () => ({ type: states.CRYPTO_REMOVE_EXCHANGE_FAILURE });
const displaySnackbar = ({ message, type }) => ({
    type: 'CRYPTO_REQUEST_SHOW_SNACKBAR',
    isSnackbarDisplayed: true,
    snackbarMessage: message,
    snackbarType: type,
});

const addExchange = ({ exchange, userId }) => async (dispatch) => {
    dispatch(addExchangeLoading());

    let status;
    let json;
    try {
        ({ status, json } = await userService.addExchange({ exchange, userId }));
    } catch (error) {
        console.error('Profile : error while trying to add an exchange');
        dispatch(displaySnackbar({ message: error.message, type: snackbarTypes.ERROR }));
        dispatch(addExchangeError());
    }
    if (status !== 200) {
        console.error('Profile : error while trying to add an exchange');
        dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
        dispatch(addExchangeError());
    } else {
        dispatch(displaySnackbar({ message: 'Exchange added successfully', type: snackbarTypes.SUCCESS }));
        dispatch(addExchangeSuccess({ exchange }));
    }
};

const removeExchange = ({ exchangeName, userId }) => async (dispatch) => {
    dispatch(removeExchangeLoading());
    try {
        const { json, status } = await userService.removeExchange({ exchangeName, userId });
        if (status !== 200) {
            console.error('Profile : error while trying to remove an exchange');
            dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
            dispatch(removeExchangeError());
        } else {
            dispatch(displaySnackbar({ message: 'Exchange removeed successfully', type: snackbarTypes.SUCCESS }));
            dispatch(removeExchangeSuccess({ exchangeName }));
        }
    } catch (error) {
        console.error('Profile : error while trying to remove an exchange');
        dispatch(displaySnackbar({ message: error.message, type: snackbarTypes.ERROR }));
        dispatch(removeExchangeError());
    }
};

const getExchanges = () => async (dispatch) => {
    dispatch(getExchangesLoading());
    try {
        const { json, status } = await exchangeService.getExchanges();
        if (status !== 200) {
            console.error('Profile : Error while getting the exchanges');
            dispatch(getExchangesFailure());
            dispatch(push(paths.authenticated.dashboard));
        } else {
            dispatch(getExchangesSuccess({ exchanges: json }));
        }
    } catch (error) {
        console.error(error);
        console.log('Profile : Error while getting the exchanges');
        dispatch(getExchangesFailure());
        dispatch(push(paths.authenticated.dashboard));
    }
};

const getUserDetails = () => async (dispatch) => {
    const userId = window.localStorage.getItem(localStorageConstants.userId);
    dispatch(getUserDetailsLoading());
    let status;
    let json;
    try {
        ({ status, json } = await userService.getUserDetails(userId));
    } catch (error) {
        dispatch(getUserDetailsFailure());
        dispatch(displaySnackbar({ message: error.message, type: snackbarTypes.ERROR }));
        dispatch(push(paths.authenticated.dashboard));
    }
    if (status !== 200) {
        dispatch(getUserDetailsFailure());
        dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
        dispatch(push(paths.authenticated.dashboard));
    } else {
        dispatch(getUserDetailsSuccess({ user: json }));
    }
};

export default {
    states,
    getExchanges,
    addExchange,
    removeExchange,
    getUserDetails,
};
