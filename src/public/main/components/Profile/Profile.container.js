import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Profile from './Profile.component';
import actions from './Profile.actions';

const mapStateToProps = state => ({
    user: state.app.user,
    isFetching: state.profile.isFetching,
    exchanges: state.profile.exchanges,
});

const mapDispatchToProps = dispatch =>
    ({
        getExchanges: () => dispatch(actions.getExchanges()),
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
