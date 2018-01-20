import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Dashboard from './Dashboard.component';
import actions from './Dashboard.actions';

const mapStateToProps = state => state;

const mergeProps = (state, { dispatch }, { ...otherProps }) => ({
    ...otherProps,
    ...state,
    getSymbols: () => dispatch(actions.getSymbols(state.app.user.exchanges)),
    getPrices: ({ exchangeName, symbol }) => dispatch(actions.getPrices({ exchangeName, symbol })),
});

export default withRouter(connect(mapStateToProps, null, mergeProps)(Dashboard));
