import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';
import appReducer from './appReducer';
import dashboardReducer from './dashboardReducer';
import profileReducer from './profileReducer';
import exchangeReducer from './exchangeReducer';

const mainReducer = combineReducers({
    loadingBar: loadingBarReducer,
    router: routerReducer,
    app: appReducer,
    dashboard: dashboardReducer,
    profile: profileReducer,
    exchanges: exchangeReducer,
    form: formReducer,
});

/* eslint-disable no-param-reassign */
const rootReducer = (state, action) => {
    if (action.type === 'CRYPTO_REQUEST_LOGOUT') {
        state = undefined;
    }
    return mainReducer(state, action);
};


export default rootReducer;
