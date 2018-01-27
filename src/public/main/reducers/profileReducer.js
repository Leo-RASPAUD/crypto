/* eslint-disable indent */
import actions from 'components/Profile/Profile.actions';

const profileReducer = (state = {
    isFetchingExchanges: true,
    isFetchingUser: true,
    exchanges: [],
    user: {},
}, action) => {
    switch (action.type) {
        case actions.states.CRYPTO_GET_EXCHANGES_LOADING:
            return {
                ...state,
                isFetchingExchanges: true,
            };
        case actions.states.CRYPTO_GET_EXCHANGES_SUCCESS:
            return {
                ...state,
                isFetchingExchanges: false,
                exchanges: action.exchanges,
            };
        case actions.states.CRYPTO_GET_EXCHANGES_FAILURE:
            return {
                ...state,
                isFetchingExchanges: false,
            };
        case actions.states.CRYPTO_GET_USER_DETAILS_LOADING:
            return {
                ...state,
                isFetchingUser: true,
            };
        case actions.states.CRYPTO_GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                isFetchingUser: false,
                user: action.user,
            };
        case actions.states.CRYPTO_GET_USER_DETAILS_FAILURE:
            return {
                ...state,
                isFetchingUser: false,
            };
        case actions.states.CRYPTO_ADD_EXCHANGE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    exchanges: state.user.exchanges.concat(action.exchange),
                },
            };
        case actions.states.CRYPTO_REMOVE_EXCHANGE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    exchanges: state.user.exchanges.filter(exchange => exchange.name !== action.exchangeName),
                },
                exchanges: state.exchanges.concat(action.exchangeName),
            };
        default:
            return state;
    }
};

export default profileReducer;
