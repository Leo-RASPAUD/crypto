/* eslint-disable indent */
import actions from 'components/Profile/Profile.actions';

const profileReducer = (state = {
    isFetching: false,
    exchanges: [],
}, action) => {
    switch (action.type) {
        case actions.states.CRYPTO_GET_EXCHANGES_LOADING:
            return {
                ...state,
                isFetching: true,
            };
        case actions.states.CRYPTO_GET_EXCHANGES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                exchanges: action.exchanges,
            };
        case actions.states.CRYPTO_GET_EXCHANGES_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
};

export default profileReducer;
