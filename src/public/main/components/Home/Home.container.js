import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Home from './Home.component';
import actions from './Home.actions';

const mapDispatchToProps = dispatch =>
    ({
        submitLogin: values => dispatch(actions.submitLogin(values)),
    });

export default withRouter(connect(null, mapDispatchToProps)(Home));
