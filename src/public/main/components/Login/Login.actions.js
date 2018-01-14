import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import userService from 'services/user.service';
import exchangeService from 'services/exchange.service';
import paths from 'components/App/App.paths';
import localStorageConstants from 'constants/localStorage.constants';
import states from './Login.states';

const submitLogin = credentials => async (dispatch) => {
    console.log(credentials);
    dispatch({ type: states.REQUEST_SUBMIT_LOGIN });
    try {
        const { status, json } = await userService.login({ ...credentials, email: credentials.email.toLowerCase() });
        if (status !== 200) {
            throw new SubmissionError({
                _error: json.message,
            });
        } else {
            window.localStorage.setItem(localStorageConstants.userId, json._id);
            window.localStorage.setItem(localStorageConstants.token, json.token);
            console.log(json.exchanges);
            const exchanges = await Promise.all(json.exchanges.map(exchange => exchangeService.getSymbols(exchange.name)));
            dispatch({
                type: states.RECEIVE_LOGIN_SUCCESSFUL,
                user: json,
                exchanges,
            });
            dispatch(push(paths.authenticated.dashboard));
        }
    } catch (error) {
        throw new SubmissionError({
            _error: error.errors._error,
        });
    }
};

export default {
    submitLogin,
};
