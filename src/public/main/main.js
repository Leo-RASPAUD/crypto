import { render } from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import pink from 'material-ui/colors/red';

import App from 'components/App/App.container';
import mainReducer from 'reducers/mainReducer';

import 'assets/loader.css';
import settings from './utils/settings';


settings.initEnvironmentVariables().then(() => {
    const history = createHistory();

    const composeFunctions = [
        applyMiddleware(thunkMiddleware),
        applyMiddleware(routerMiddleware(history)),
        ...(process.env.NODE_ENV !== 'production' ?
            [window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION__()] :
            {}),
    ];

    const store = createStore(
        mainReducer,
        compose(...composeFunctions),
    );

    const theme = createMuiTheme({
        palette: {
            primary: {
                ...teal,
            },
            secondary: {
                ...pink,
                A200: '#f88379',
                A400: '#E43D40',
            },
            alternateTextColor: 'white',
        },
        typography: {
            fontFamily: '\'Nunito\', sans-serif',
        },
    });

    render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <MuiThemeProvider theme={theme}>
                    <App />
                </MuiThemeProvider>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root'),
    );
});
