import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Profile from './Profile.component';

const mapStateToProps = state => ({
    user: state.app.user,
});

export default withRouter(connect(mapStateToProps, null)(Profile));
