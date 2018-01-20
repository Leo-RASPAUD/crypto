/* eslint-disable indent */
import loadingAppStates from 'components/LoadingApp/LoadingApp.states';
import loginStates from 'components/Login/Login.states';
import appStates from 'components/App/App.states';

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
}, action) => {
    switch (action.type) {
        case loginStates.CRYPTO_RECEIVE_LOGIN_SUCCESSFUL:
            return {
                ...state,
                loadingApp: action.loadingApp,
            };
        case loginStates.CRYPTO_GO_TO_LOADING:
            return {
                ...state,
                loadingApp: action.loadingApp,
            };
        case appStates.CRYPTO_REDIRECT_TO_LOGIN:
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
        default:
            return state;
    }
};

export default appReducer;
