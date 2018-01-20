import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';
import { SubmissionError } from 'redux-form';
import userService from 'services/user.service';
import localStorageConstants from 'constants/localStorage.constants';
import states from './Login.states';

const submitLogin = credentials => async (dispatch) => {
    dispatch({ type: states.CRYPTO_REQUEST_SUBMIT_LOGIN });
    try {
        const { status, json } = await userService.login({ ...credentials, email: credentials.email.toLowerCase() });
        if (status !== 200) {
            throw new SubmissionError({
                _error: json.message,
            });
        } else {
            window.localStorage.setItem(localStorageConstants.userId, json._id);
            window.localStorage.setItem(localStorageConstants.token, json.token);
            dispatch(push(paths.authenticated.dashboard));
            dispatch({
                type: states.CRYPTO_RECEIVE_LOGIN_SUCCESSFUL,
                loadingApp: true,
            });
            dispatch(push(paths.public.loading));
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
