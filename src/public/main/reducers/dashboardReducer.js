/* eslint-disable indent */
import loginStates from 'components/Login/Login.states';
import loadingStates from 'components/LoadingApp/LoadingApp.states';

const dashboardReducer = (state = {
    accountInformations: [],
}, action) => {
    switch (action.type) {
        case loginStates.CRYPTO_RECEIVE_LOGIN_SUCCESSFUL:
            return {
                ...state,
                userAuthenticated: !!action.user,
                user: action.user,
                exchanges: action.exchanges,
                accountInfo: action.accountInfo,
            };
        case loadingStates.CRYPTO_ACCOUNT_INFORMATIONS_LOADED:
            return {
                ...state,
                accountInformations: state.accountInformations.concat({
                    exchangeName: action.exchangeName,
                    data: action.data,
                }),
            };
        default:
            return state;
    }
};

export default dashboardReducer;
