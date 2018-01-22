import exchangeService from 'services/exchange.service';
import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';

const states = {
    CRYPTO_GET_EXCHANGES_LOADING: 'CRYPTO_GET_EXCHANGES_LOADING',
    CRYPTO_GET_EXCHANGES_SUCCESS: 'CRYPTO_GET_EXCHANGES_SUCCESS',
    CRYPTO_GET_EXCHANGES_FAILURE: 'CRYPTO_GET_EXCHANGES_FAILURE',
};

const getExchangesLoading = () => ({ type: states.CRYPTO_GET_EXCHANGES_LOADING });
const getExchangesSuccess = ({ exchanges }) => ({ type: states.CRYPTO_GET_EXCHANGES_SUCCESS, exchanges });
const getExchangesFailure = () => ({ type: states.CRYPTO_GET_EXCHANGES_FAILURE });

const getExchanges = () => async (dispatch) => {
    dispatch(getExchangesLoading());
    try {
        const { json, status } = await exchangeService.getExchanges();
        console.log(json, status);
        if (status !== 200) {
            console.log('Profile : Error while getting the exchanges');
            dispatch(getExchangesFailure());
            dispatch(push(paths.authenticated.dashboard));
        } else {
            dispatch(getExchangesSuccess({ exchanges: json }));
        }
    } catch (error) {
        console.log(error);
        console.log('Profile : Error while getting the exchanges');
        dispatch(getExchangesFailure());
        dispatch(push(paths.authenticated.dashboard));
    }
};

export default {
    states,
    getExchanges,
};
