/* eslint-disable indent */
import states from 'components/App/App.states';
import loginStates from 'components/Login/Login.states';

const emptyUser = {
    id: '',
    name: '',
    account_type: '',
};

const appReducer = (state = {
    userAuthenticated: false,
    user: emptyUser,
    loadingUser: true,
    exchanges: [],
}, action) => {
    switch (action.type) {
        case loginStates.RECEIVE_LOGIN_SUCCESSFUL:
            return {
                ...state,
                userAuthenticated: !!action.user,
                user: action.user,
            };
        case states.RECEIVE_CHECK_USER_TOKEN:
            return {
                ...state,
                userAuthenticated: !!action.user,
                user: action.user || emptyUser,
                loadingUser: action.loadingUser,
                exchanges: action.exchanges,
            };
        default:
            return state;
    }
};

export default appReducer;
