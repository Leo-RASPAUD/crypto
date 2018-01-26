import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from './App.component';
import actions from './App.actions';

const mapStateToProps = state => ({
    user: state.app.user,
    isUserAuthenticated: !!state.app.user,
    isUserLoading: state.app.isUserLoading,
});

const mapDispatchToProps = dispatch => ({
    checkCredentials: () => dispatch(actions.checkCredentials()),
    goToProfile: () => dispatch(actions.goToProfile()),
    goToDashboard: () => dispatch(actions.goToDashboard()),
    logout: () => dispatch(actions.logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
