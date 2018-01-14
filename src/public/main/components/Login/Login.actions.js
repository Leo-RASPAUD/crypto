import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import userService from 'services/user.service';
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
            window.localStorage.setItem(localStorageConstants.userId, json.id);
            dispatch({
                type: states.RECEIVE_LOGIN_SUCCESSFUL,
                user: json.id,
            });
            dispatch(push(paths.authenticated.dashboard));
        }
    } catch (error) {
        console.log(error);
        throw new SubmissionError({
            _error: error.errors._error,
        });
    }
};

export default {
    submitLogin,
};
