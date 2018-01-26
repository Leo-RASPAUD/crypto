import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Symbol from './Symbol.component';
import actions from './Symbol.actions';

const mapDispatchToProps = dispatch => ({
    getTrend: ({ exchangeName, symbol, symbolBaseName }) => dispatch(actions.getTrend({ exchangeName, symbol, symbolBaseName })),
});

export default withRouter(connect(null, mapDispatchToProps)(Symbol));
