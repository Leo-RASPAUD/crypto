import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from './App.component';
import actions from './App.actions';

const mapStateToProps = state => ({
    authenticated: state.app.userAuthenticated,
    user: state.app.user,
});

const mapDispatchToProps = dispatch => ({
    redirectToLogin: () => dispatch(actions.redirectToLogin()),
    goToLoading: () => dispatch(actions.goToLoading()),
    logout: () => dispatch(actions.logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
