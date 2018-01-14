import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Dashboard from './Dashboard.component';

const mapStateToProps = state => ({
    user: state.app.user,
});


export default withRouter(connect(mapStateToProps, null)(Dashboard));
