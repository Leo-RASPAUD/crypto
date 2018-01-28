/* eslint-disable indent */
import symbolActions from 'components/Dashboard/Exchange/ExchangePresentation/Symbol/Symbol.actions';

const dashboardReducer = (state = {
    prices: null,
}, action) => {
    switch (action.type) {
        case symbolActions.states.CRYPTO_GET_PRICES_SUCCESS:
            return {
                ...state,
                prices: action.prices,
            };
        default:
            return state;
    }
};

export default dashboardReducer;
