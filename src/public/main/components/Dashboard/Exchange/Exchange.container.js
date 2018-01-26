import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Exchange from './Exchange.component';
import actions from './Exchange.actions';

const mapDispatchToProps = dispatch => ({
    getExchangeInformations: ({ exchange }) => dispatch(actions.getExchangeInformations({ exchange })),
});

export default withRouter(connect(null, mapDispatchToProps)(Exchange));
