/* eslint-disable indent */
import loadingAppStates from 'components/LoadingApp/LoadingApp.states';
import appActions from 'components/App/App.actions';
import snackbarTypes from 'utils/snackbarTypes';
import loginActions from 'components/Login/Login.actions';

const emptyUser = {
    id: '',
    name: '',
    account_type: '',
};

const appReducer = (state = {
    userAuthenticated: false,
    user: emptyUser,
    loadingUserData: true,
    loadingApp: true,
    accountInformations: [],
    exchanges: [],
    isSnackbarDisplayed: false,
    snackbarMessage: '',
    snackbarType: snackbarTypes.INFO,
}, action) => {
    switch (action.type) {
        case loginActions.states.CRYPTO_RECEIVE_LOGIN_SUCCESSFUL:
            return {
                ...state,
                loadingApp: action.loadingApp,
            };
        case loginActions.states.CRYPTO_GO_TO_LOADING:
            return {
                ...state,
                loadingApp: action.loadingApp,
            };
        case appActions.states.CRYPTO_REDIRECT_TO_LOGIN:
            return {
                ...state,
                userAuthenticated: false,
                user: emptyUser,
                loadingApp: action.loadingApp,
            };
        case loadingAppStates.CRYPTO_RECEIVE_CHECK_USER_TOKEN:
            return {
                ...state,
                userAuthenticated: !!action.user,
                user: action.user || emptyUser,
                loadingUserData: action.loadingUserData,
            };
        case loadingAppStates.CRYPTO_REQUEST_LOAD_USER_DETAILS_SUCCESS:
            return {
                ...state,
                userAuthenticated: !!action.user,
                user: action.user || emptyUser,
            };
        case loadingAppStates.CRYPTO_RECEVE_ACCOUNT_INFORMATIONS:
            return {
                ...state,
                userAuthenticated: !!action.user,
                user: action.user || emptyUser,
                loadingUserData: action.loadingUserData,
                accountInformations: action.accountInformations,
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
