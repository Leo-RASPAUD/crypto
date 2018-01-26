/* eslint-disable indent */
import appActions from 'components/App/App.actions';
import snackbarTypes from 'utils/snackbarTypes';
import loginActions from 'components/Login/Login.actions';

const appReducer = (state = {
    user: null,
    isUserLoading: false,
    isUserAuthenticated: false,
    isSnackbarDisplayed: false,
    snackbarMessage: '',
    snackbarType: snackbarTypes.INFO,
}, action) => {
    switch (action.type) {
        case loginActions.states.CRYPTO_CREATE_USER_SUCCESS:
        case loginActions.states.CRYPTO_REQUEST_LOGIN_SUCCESS:
        case loginActions.states.CRYPTO_REQUEST_LOGIN_FAILURE:
        case appActions.states.CRYPTO_REQUEST_CHECK_CREDENTIALS_SUCCESS:
        case appActions.states.CRYPTO_REQUEST_CHECK_CREDENTIALS_FAILURE:
            return {
                ...state,
                user: action.user,
                isUserLoading: false,
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
