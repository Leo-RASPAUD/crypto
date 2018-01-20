import userService from 'services/user.service';
import localStorageConstants from 'constants/localStorage.constants';
import exchangeService from 'services/exchange.service';
import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';
import states from './LoadingApp.states';

const getAccountInformations = ({ exchange }) => async (dispatch) => {
    dispatch({ type: states.CRYPTO_REQUEST_LOAD_ACCOUNT_INFORMATIONS });
    return new Promise(async (resolve, reject) => {
        try {
            const { json } = await exchangeService.getAccountInfo({ exchange });
            resolve(json);
        } catch (error) {
            console.log('getAccountInformations', error);
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
