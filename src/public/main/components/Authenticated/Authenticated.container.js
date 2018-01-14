import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Authenticated from './Authenticated.component';

export default withRouter(connect(null, null)(Authenticated));
