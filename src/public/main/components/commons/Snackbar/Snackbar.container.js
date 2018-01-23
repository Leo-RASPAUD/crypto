import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import snackbarTypes from 'utils/snackbarTypes';
import SnackbarComponent from './Snackbar.component';

const closeSnackbar = () => (dispatch) => {
    dispatch({
        type: 'CRYPTO_RECEIVE_HIDE_SNACKBAR',
        isSnackbarDisplayed: false,
        snackbarMessage: '',
        snackbarType: snackbarTypes.INFO,
    });
};


const mapStateToProps = state =>
    ({
        isSnackbarDisplayed: state.app.isSnackbarDisplayed,
        message: state.app.snackbarMessage,
        snackbarType: state.app.snackbarType,
    });

const mapDispatchToProps = dispatch =>
    ({
        closeSnackbar: () => dispatch(closeSnackbar()),
    });


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SnackbarComponent));
