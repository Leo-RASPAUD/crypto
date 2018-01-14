import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from './App.component';

const mapStateToProps = state => ({
    authenticated: state.app.userAuthenticated,
});

export default withRouter(connect(mapStateToProps, null)(App));
