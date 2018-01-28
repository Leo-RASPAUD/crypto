import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Dashboard from './Dashboard.component';
import actions from './Dashboard.actions';

const mapStateToProps = state => ({
    exchanges: state.exchanges.exchanges,
    prices: state.dashboard.prices,
});

const mergeProps = (state, { dispatch }, { ...otherProps }) => ({
    ...otherProps,
    ...state,
    getSymbols: () => dispatch(actions.getSymbols(state.exchanges)),
    getPrices: ({ exchangeName, symbol }) => dispatch(actions.getPrices({ exchangeName, symbol })),
    getLastPrice: ({ exchangeName, symbol }) => dispatch(actions.getLastPrice({ exchangeName, symbol })),
});

export default withRouter(connect(mapStateToProps, null, mergeProps)(Dashboard));
