/* eslint-disable indent */
import loginActions from 'components/Login/Login.actions';
import profileActions from 'components/Profile/Profile.actions';

const dashboardReducer = (state = {
    accountInformations: [],
}, action) => {
    switch (action.type) {
        case loginActions.states.CRYPTO_RECEIVE_LOGIN_SUCCESSFUL:
            return {
                ...state,
                userAuthenticated: !!action.user,
                user: action.user,
                exchanges: action.exchanges,
                accountInfo: action.accountInfo,
            };
        case profileActions.states.CRYPTO_REMOVE_EXCHANGE_SUCCESS:
            return {
                ...state,
                accountInformations: state.accountInformations.filter(item => item.exchangeName !== action.exchangeRemoved.name),
            };
        default:
            return state;
    }
};

export default dashboardReducer;
