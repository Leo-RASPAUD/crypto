import snackbarTypes from 'utils/snackbarTypes';
import exchangeService from 'services/exchange.service';

const states = {
    CRYPTO_GET_EXCHANGE_INFORMATIONS_LOADING: 'CRYPTO_GET_EXCHANGE_INFORMATIONS_LOADING',
    CRYPTO_GET_EXCHANGE_INFORMATIONS_FAILURE: 'CRYPTO_GET_EXCHANGE_INFORMATIONS_FAILURE',
    CRYPTO_GET_EXCHANGE_INFORMATIONS_SUCCESS: 'CRYPTO_GET_EXCHANGE_INFORMATIONS_SUCCESS',
};

const getExchangeInformationsLoading = () => ({ type: states.CRYPTO_GET_EXCHANGE_INFORMATIONS_LOADING });
const getExchangeInformationsFailure = ({ exchange }) => ({ type: states.CRYPTO_GET_EXCHANGE_INFORMATIONS_FAILURE, exchange });
const getExchangeInformationsSuccess = ({ exchange }) => ({ type: states.CRYPTO_GET_EXCHANGE_INFORMATIONS_SUCCESS, exchange });
const displaySnackbar = ({ message, type }) => ({
    type: 'CRYPTO_REQUEST_SHOW_SNACKBAR',
    isSnackbarDisplayed: true,
    snackbarMessage: message,
    snackbarType: type,
});

const getExchangeInformations = ({ exchange }) => async (dispatch) => {
    dispatch(getExchangeInformationsLoading());
    let status;
    let json;
    try {
        ({ status, json } = await exchangeService.getAccountInfo({ exchange }));
    } catch (error) {
        dispatch(getExchangeInformationsFailure({ exchange }));
        dispatch(displaySnackbar({ message: error.message, type: snackbarTypes.ERROR }));
    }
    if (status !== 200) {
        dispatch(getExchangeInformationsFailure({ exchange }));
        dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
    } else {
        dispatch(getExchangeInformationsSuccess({ exchange: json }));
    }
};

export default {
    states,
    getExchangeInformations,
};
