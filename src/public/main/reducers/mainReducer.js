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

export default mainReducer;
