import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import appReducer from './appReducer';
import dashboardReducer from './dashboardReducer';
import profileReducer from './profileReducer';

const mainReducer = combineReducers({
    router: routerReducer,
    app: appReducer,
    dashboard: dashboardReducer,
    profile: profileReducer,
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
