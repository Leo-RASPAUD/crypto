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
    REQUEST_SHOW_SNACKBAR: 'CRYPTO_REQUEST_SHOW_SNACKBAR',
};

const getExchangesLoading = () => ({ type: states.CRYPTO_GET_EXCHANGES_LOADING });
const getExchangesSuccess = ({ exchanges }) => ({ type: states.CRYPTO_GET_EXCHANGES_SUCCESS, exchanges });
const getExchangesFailure = () => ({ type: states.CRYPTO_GET_EXCHANGES_FAILURE });
const addExchangeLoading = () => ({ type: states.CRYPTO_ADD_EXCHANGE_LOADING });
const addExchangeSuccess = ({ exchanges }) => ({ type: states.CRYPTO_ADD_EXCHANGE_SUCCESS, exchanges });
const addExchangeError = () => ({ type: states.CRYPTO_ADD_EXCHANGE_FAILURE });
const removeExchangeLoading = () => ({ type: states.CRYPTO_REMOVE_EXCHANGE_LOADING });
const removeExchangeSuccess = ({ exchanges }) => ({ type: states.CRYPTO_REMOVE_EXCHANGE_SUCCESS, exchanges });
const removeExchangeError = () => ({ type: states.CRYPTO_REMOVE_EXCHANGE_FAILURE });
const displaySnackbar = ({ message, type }) => ({
    type: states.REQUEST_SHOW_SNACKBAR,
    isSnackbarDisplayed: true,
    snackbarMessage: message,
    snackbarType: type,
});

const addExchange = ({ exchange, userId }) => async (dispatch) => {
    dispatch(addExchangeLoading());
    try {
        const { json, status } = await userService.addExchange({ exchange, userId });
        if (status !== 200) {
            console.error('Profile : error while trying to add an exchange');
            dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
            dispatch(addExchangeError());
        } else {
            dispatch(displaySnackbar({ message: 'Exchange added successfully', type: snackbarTypes.SUCCESS }));
            dispatch(addExchangeSuccess({ exchanges: json.exchanges }));
        }
    } catch (error) {
        console.error('Profile : error while trying to add an exchange');
        dispatch(displaySnackbar({ message: error, type: snackbarTypes.ERROR }));
        dispatch(addExchangeError());
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
            dispatch(removeExchangeSuccess({ exchanges: json.exchanges }));
        }
    } catch (error) {
        console.error('Profile : error while trying to remove an exchange');
        dispatch(displaySnackbar({ message: error, type: snackbarTypes.ERROR }));
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

export default {
    states,
    getExchanges,
    addExchange,
    removeExchange,
};
