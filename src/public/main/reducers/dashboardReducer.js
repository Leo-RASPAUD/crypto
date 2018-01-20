/* eslint-disable indent */
import loginStates from 'components/Login/Login.states';

const dashboardReducer = (state = {
    symbols: [],
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
        default:
            return state;
    }
};

export default dashboardReducer;
