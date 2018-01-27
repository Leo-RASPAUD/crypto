import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Profile from './Profile.component';
import actions from './Profile.actions';

const mapStateToProps = state => ({
    user: state.profile.user,
    isFetchingExchanges: state.profile.isFetchingExchanges,
    isFetchingUser: state.profile.isFetchingUser,
    exchanges: state.profile.exchanges,
});

const mergeProps = (state, { dispatch }, { ...otherProps }) => ({
    ...otherProps,
    ...state,
    getExchanges: () => dispatch(actions.getExchanges()),
    addExchange: ({ exchange }) => dispatch(actions.addExchange({ exchange, userId: state.user._id })),
    removeExchange: ({ exchangeName }) => dispatch(actions.removeExchange({ exchangeName, userId: state.user._id })),
    getUserDetails: () => dispatch(actions.getUserDetails()),
});

export default withRouter(connect(mapStateToProps, null, mergeProps)(Profile));
