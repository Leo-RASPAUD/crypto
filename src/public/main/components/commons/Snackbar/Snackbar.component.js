import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import snackbarTypes from 'utils/snackbarTypes';

import styles from './Snackbar.style';

const getClass = (snackbarType, classes) => {
    if (snackbarType === snackbarTypes.ERROR) return classes.error;
    if (snackbarType === snackbarTypes.WARN) return classes.warn;
    if (snackbarType === snackbarTypes.SUCCESS) return classes.success;
    return classes.root;
};

const snackbarParams = {
    vertical: 'bottom',
    horizontal: 'right',
    duration: 5000,
};

class SnackbarComponent extends React.Component {
    render() {
        const { isSnackbarDisplayed, closeSnackbar, message, snackbarType, classes } = this.props;
        const snackbarClass = getClass(snackbarType, classes);
        return (
            <Snackbar
                anchorOrigin={{ vertical: snackbarParams.vertical, horizontal: snackbarParams.horizontal }}
                open={isSnackbarDisplayed}
                onClose={closeSnackbar}
                autoHideDuration={snackbarParams.duration}
                SnackbarContentProps={{
                    classes: {
                        root: snackbarClass,
                    },
                }}
                message={message}
            />
        );
    }
}

SnackbarComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    isSnackbarDisplayed: PropTypes.bool.isRequired,
    closeSnackbar: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    snackbarType: PropTypes.string.isRequired,
};

export default withStyles(styles)(SnackbarComponent);
