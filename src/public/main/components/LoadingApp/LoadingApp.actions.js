import userService from 'services/user.service';
import localStorageConstants from 'constants/localStorage.constants';
import exchangeService from 'services/exchange.service';
import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';
import states from './LoadingApp.states';

const getAccountInformations = ({ exchange }) => async (dispatch) => {
    dispatch({ type: states.CRYPTO_REQUEST_LOAD_ACCOUNT_INFORMATIONS_LOADING });
    return new Promise(async (resolve, reject) => {
        try {
            const { json } = await exchangeService.getAccountInfo({ exchange });
            dispatch({
                type: states.CRYPTO_ACCOUNT_INFORMATIONS_SUCCESS,
                exchangeName: json.name,
                data: json.data,
            });
            resolve(json);
        } catch (error) {
            dispatch({ type: states.CRYPTO_ACCOUNT_INFORMATIONS_FAILURE });
            console.log('getAccountInformations', error);
            dispatch(push(paths.public.login));
            reject(error);
        }
    });
};

const loadUserDetails = () => async (dispatch) => {
    dispatch({ type: states.CRYPTO_REQUEST_LOAD_USER_DETAILS });
    try {
        const userId = window.localStorage.getItem(localStorageConstants.userId);
        const { status, json } = await userService.getUserDetails(userId);
        if (status !== 200) {
            console.log(status);
            dispatch(push(paths.public.login));
        }
        dispatch({ type: states.CRYPTO_REQUEST_LOAD_USER_DETAILS_SUCCESS, user: json });
        return json;
    } catch (error) {
        console.error(error);
        dispatch(push(paths.public.login));
        return null;
    }
};

const goToDashboard = () => async (dispatch) => {
    dispatch(push(paths.authenticated.dashboard));
};

export default {
    getAccountInformations,
    loadUserDetails,
    goToDashboard,
};
