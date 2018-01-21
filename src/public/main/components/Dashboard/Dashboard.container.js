import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Dashboard from './Dashboard.component';
import actions from './Dashboard.actions';

const mapStateToProps = state => ({
    accountInformations: state.dashboard.accountInformations,
    exchanges: state.app.user.exchanges,
});

const mergeProps = (state, { dispatch }, { ...otherProps }) => ({
    ...otherProps,
    ...state,
    getSymbols: () => dispatch(actions.getSymbols(state.exchanges)),
    getPrices: ({ exchangeName, symbol }) => dispatch(actions.getPrices({ exchangeName, symbol })),
});

export default withRouter(connect(mapStateToProps, null, mergeProps)(Dashboard));
