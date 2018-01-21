import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import paths from 'components/App/App.paths';
import App from './App.component';
import states from './App.states';
import actions from './App.actions';

const mapStateToProps = state => ({
    authenticated: state.app.userAuthenticated,
    user: state.app.user,
});

const mapDispatchToProps = dispatch => ({
    redirectToLogin: () => {
        dispatch({
            type: states.CRYPTO_REDIRECT_TO_LOGIN,
            loadingApp: false,
        });
        dispatch(push(paths.public.login));
    },
    goToLoading: () => {
        dispatch({
            type: states.CRYPTO_GO_TO_LOADING,
            loadingApp: true,
        });
        dispatch(push(paths.public.loading));
    },
    logout: () => dispatch(actions.logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
