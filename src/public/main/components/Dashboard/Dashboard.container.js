import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Dashboard from './Dashboard.component';

const mapStateToProps = state => ({
    user: state.app.user,
    exchangesData: state.app.exchanges,
});


export default withRouter(connect(mapStateToProps, null)(Dashboard));
