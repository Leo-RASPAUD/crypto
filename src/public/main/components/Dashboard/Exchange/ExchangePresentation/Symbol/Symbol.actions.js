import snackbarTypes from 'utils/snackbarTypes';
import exchangeService from 'services/exchange.service';

const states = {
    CRYPTO_GET_TREND_LOADING: 'CRYPTO_GET_TREND_LOADING',
    CRYPTO_GET_TREND_FAILURE: 'CRYPTO_GET_TREND_FAILURE',
    CRYPTO_GET_TREND_SUCCESS: 'CRYPTO_GET_TREND_SUCCESS',
};

const getTrendLoading = ({ exchangeName, symbolBaseName }) => ({ type: states.CRYPTO_GET_TREND_LOADING, symbolBaseName, exchangeName });
const getTrendFailure = ({ exchangeName, symbolBaseName }) => ({ type: states.CRYPTO_GET_TREND_FAILURE, exchangeName, symbolBaseName });
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

const getTrend = ({ exchangeName, symbol, symbolBaseName }) => async (dispatch) => {
    dispatch(getTrendLoading({ exchangeName, symbolBaseName }));
    let status;
    let json;
    try {
        const symbolToSearch = symbolBaseName === 'USDT' ? 'ETHUSDT' : symbol;
        ({ status, json } = await exchangeService.getTrend({ exchangeName, symbol: symbolToSearch }));
    } catch (error) {
        dispatch(getTrendFailure({ symbolBaseName, exchangeName }));
        dispatch(displaySnackbar({ message: error.message, type: snackbarTypes.ERROR }));
    }
    if (status !== 200) {
        dispatch(getTrendFailure({ symbolBaseName, exchangeName }));
        dispatch(displaySnackbar({ message: json.message, type: snackbarTypes.ERROR }));
    } else {
        dispatch(getTrendSuccess({
            exchangeName,
            symbolBaseName,
            ethLastPrice: json.ethLastPrice,
            trend: {
                previousPrice: json.prices[0],
                currentPrice: json.prices[1],
            },
        }));
    }
};

export default {
    states,
    getTrend,
};
