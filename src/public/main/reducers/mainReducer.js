import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import appReducer from './appReducer';
import dashboardReducer from './dashboardReducer';

const mainReducer = combineReducers({
    router: routerReducer,
    app: appReducer,
    dashboard: dashboardReducer,
    form: formReducer,
});

/* eslint-disable no-param-reassign */
const rootReducer = (state, action) => {
    if (action.type === 'REQUEST_LOGOUT') {
        state = undefined;
    }
    return mainReducer(state, action);
};


export default rootReducer;
