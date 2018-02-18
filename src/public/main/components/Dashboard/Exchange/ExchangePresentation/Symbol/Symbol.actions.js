import snackbarTypes from 'utils/snackbarTypes';
import exchangeService from 'services/exchange.service';

const states = {
    CRYPTO_GET_TREND_LOADING: 'CRYPTO_GET_TREND_LOADING',
    CRYPTO_GET_TREND_FAILURE: 'CRYPTO_GET_TREND_FAILURE',
    CRYPTO_GET_TREND_SUCCESS: 'CRYPTO_GET_TREND_SUCCESS',
    CRYPTO_GET_PRICES_LOADING: 'CRYPTO_GET_PRICES_LOADING',
    CRYPTO_GET_PRICES_FAILURE: 'CRYPTO_GET_PRICES_FAILURE',
    CRYPTO_GET_PRICES_SUCCESS: 'CRYPTO_GET_PRICES_SUCCESS',
};

const getTrendLoading = ({ exchangeName, symbolBaseName }) => ({ type: states.CRYPTO_GET_TREND_LOADING, symbolBaseName, exchangeName });
const getTrendFailure = ({ exchangeName, symbolBaseName }) => ({ type: states.CRYPTO_GET_TREND_FAILURE, exchangeName, symbolBaseName });
const getPricesLoading = () => ({ type: states.CRYPTO_GET_PRICES_LOADING });
const getPricesSuccess = ({ prices }) => ({ type: states.CRYPTO_GET_PRICES_SUCCESS, prices });
const getPricesFailure = () => ({ type: states.CRYPTO_GET_PRICES_FAILURE });
const getTrendSuccess = ({ exchangeName, symbolBaseName, trend, ethLastPrice }) => ({
    type: states.CRYPTO_GET_TREND_SUCCESS,
    exchangeName,
    symbolBaseName,
    trend,
    ethLastPrice,
});
const displaySnackbar = ({ message, type }) => ({
    type: 'CRYPTO_REQUEST_SHOW_SNACKBAR',
    isSnackbarDisplayed: true,
    snackbarMessage: message,
    snackbarType: type,
});

const getTrend = ({ exchangeName, symbol }) => async dispatch => {
    let symbolToSearch = 'ETHUSDT';
    if (symbol.asset === 'BTC') {
        symbolToSearch = `${symbol.asset}USDT`;
    } else if (symbol.asset !== 'ETH' && symbol.asset !== 'USDT') {
        symbolToSearch = `${symbol.asset}ETH`;
    }
    const symbolBaseName = symbol.asset;
    dispatch(getTrendLoading({ exchangeName, symbolBaseName }));
    let status;
    let json;
    try {
        ({ status, json } = await exchangeService.getTrend({ exchangeName, symbol: symbolToSearch }));
    } catch (error) {
        dispatch(getTrendFailure({ symbolBaseName, exchangeName }));
        dispatch(displaySnackbar({ message: error.message, type: snackbarTypes.ERROR }));
    }
    if (status !== 200) {
        dispatch(getTrendFailure({ symbolBaseName, exchangeName }));
        dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
    } else {
        dispatch(
            getTrendSuccess({
                exchangeName,
                symbolBaseName,
                ethLastPrice: json.ethLastPrice,
                trend: {
                    previousPrice: json.prices[0],
                    currentPrice: json.prices[1],
                },
            }),
        );
    }
};

const getPrices = ({ exchangeName, symbol }) => async dispatch => {
    dispatch(getPricesLoading());
    let status;
    let json;
    let symbolToSearch = 'ETHUSDT';
    if (symbol.asset === 'BTC') {
        symbolToSearch = `${symbol.asset}USDT`;
    } else if (symbol.asset !== 'ETH' && symbol.asset !== 'USDT') {
        symbolToSearch = `${symbol.asset}ETH`;
    }
    try {
        ({ json, status } = await exchangeService.getPrices({ exchangeName, symbol: symbolToSearch }));
    } catch (error) {
        dispatch(getPricesFailure());
        dispatch(displaySnackbar({ message: error.message, type: snackbarTypes.ERROR }));
    }
    if (status !== 200) {
        dispatch(getPricesFailure());
        dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
    } else {
        dispatch(getPricesSuccess({ prices: json }));
    }
};

export default {
    states,
    getTrend,
    getPrices,
};
