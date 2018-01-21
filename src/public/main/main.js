import { render } from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';

import App from 'components/App/App.container';
import mainReducer from 'reducers/mainReducer';

import 'assets/loader.css';
import 'assets/materialIcons.css';
import 'assets/cryptoIcons.css';
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
                ...blue,
            },
            secondary: {
                ...red,
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
