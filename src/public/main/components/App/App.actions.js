import localStorageConstants from 'constants/localStorage.constants';
import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';
import states from './App.states';

const logout = () => (dispatch) => {
    dispatch({ type: states.REQUEST_LOGOUT, userAuthenticated: false });
    window.localStorage.removeItem(localStorageConstants.accessToken);
    window.localStorage.removeItem(localStorageConstants.userId);
    dispatch(push(paths.public.login));
};

export default {
    logout,
};
