import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import userService from 'services/user.service';
import paths from 'components/App/App.paths';
import states from './Home.states';

const submitLogin = credentials => async (dispatch) => {
    dispatch({ type: states.REQUEST_SUBMIT_LOGIN });
    console.log(credentials);
    const { status, json } = await userService.login({ ...credentials, email: credentials.email.toLowerCase() });
    if (status !== 200) {
        throw new SubmissionError({
            _error: json.message,
        });
    }
    dispatch(push(paths.authenticated.dashboard.home));
};

export default {
    submitLogin,
};
