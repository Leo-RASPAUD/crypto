import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoadingApp from './LoadingApp.component';
import states from './LoadingApp.states';
import actions from './LoadingApp.actions';

const mapStateToProps = state => ({
    loadingUserData: state.app.loadingUserData,
    exchanges: state.app.exchanges,
});

const mergeProps = (state, { dispatch }, { ...otherProps }) => ({
    ...otherProps,
    ...state,
    setUser: ({ user, loadingUserData }) => dispatch({
        type: states.CRYPTO_RECEIVE_CHECK_USER_TOKEN,
        user,
        loadingUserData,
    }),
    setAccountInformations: ({ accountInformations, loadingUserData, user }) => dispatch({
        type: states.CRYPTO_RECEVE_ACCOUNT_INFORMATIONS,
        loadingUserData,
        user,
        accountInformations,
    }),
    loadData: () => dispatch(actions.loadData({ exchanges: state.exchanges })),
    loadUserDetails: () => dispatch(actions.loadUserDetails()),
    goToDashboard: () => dispatch(actions.goToDashboard()),
    getAccountInformations: ({ exchange }) => dispatch(actions.getAccountInformations({ exchange })),
    getSymbols: () => dispatch(actions.getSymbols(state.app.user.exchanges)),
    getPrices: ({ exchangeName, symbol }) => dispatch(actions.getPrices({ exchangeName, symbol })),
});

export default withRouter(connect(mapStateToProps, null, mergeProps)(LoadingApp));
