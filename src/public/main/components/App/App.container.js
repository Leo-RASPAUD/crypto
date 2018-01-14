import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from './App.component';
import states from './App.states';

const mapStateToProps = state => ({
    authenticated: state.app.userAuthenticated,
    loadingUser: state.app.loadingUser,
});

const mapDispatchToProps = dispatch => ({
    setUser: ({ user, loadingUser, exchanges }) => dispatch({
        type: states.RECEIVE_CHECK_USER_TOKEN,
        user,
        loadingUser,
        exchanges,
    }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
