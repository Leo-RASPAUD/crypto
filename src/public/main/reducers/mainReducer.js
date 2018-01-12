import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import appReducer from './appReducer';

const mainReducer = combineReducers({
    router: routerReducer,
    app: appReducer,
    form: formReducer,
});

export default mainReducer;
