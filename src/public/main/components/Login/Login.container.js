import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Login from './Login.component';
import actions from './Login.actions';

const mapDispatchToProps = dispatch =>
    ({
        submitLogin: values => dispatch(actions.submitLogin(values)),
        createUser: ({ credentials }) => dispatch(actions.createUser({ credentials })),
    });

export default withRouter(connect(null, mapDispatchToProps)(Login));
