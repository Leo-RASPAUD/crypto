/* eslint-disable indent */
// import loadingAppStates from 'components/LoadingApp/LoadingApp.states';
import appActions from 'components/App/App.actions';
import snackbarTypes from 'utils/snackbarTypes';
import loginActions from 'components/Login/Login.actions';
import profileActions from 'components/Profile/Profile.actions';

const appReducer = (state = {
    user: null,
    isUserLoading: true,
    isUserAuthenticated: false,

    loadingUserData: true,
    loadingApp: true,
    accountInformations: [],
    exchanges: [],
    isSnackbarDisplayed: false,
    snackbarMessage: '',
    snackbarType: snackbarTypes.INFO,
}, action) => {
    switch (action.type) {
        case loginActions.states.CRYPTO_REQUEST_LOGIN_FAILURE:
        case loginActions.states.CRYPTO_REQUEST_LOGIN_SUCCESS:
        case loginActions.states.CRYPTO_CREATE_USER_SUCCESS:
        case appActions.states.CRYPTO_REQUEST_CHECK_CREDENTIALS_FAILURE:
        case appActions.states.CRYPTO_REQUEST_CHECK_CREDENTIALS_SUCCESS:
            return {
                ...state,
                user: action.user,
                isUserLoading: false,
            };
        case profileActions.states.CRYPTO_REMOVE_EXCHANGE_SUCCESS:
            return {
                ...state,
                user: { ...state.user, exchanges: state.user.exchanges.filter(exchange => exchange.name !== action.exchangeRemoved) },
            };
        case 'CRYPTO_REQUEST_SHOW_SNACKBAR':
        case 'CRYPTO_RECEIVE_HIDE_SNACKBAR':
            return {
                ...state,
                isSnackbarDisplayed: action.isSnackbarDisplayed,
                snackbarMessage: action.snackbarMessage,
                snackbarType: action.snackbarType,
            };
        default:
            return state;
    }
};

export default appReducer;
