/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

// import styles from './AddExchangeDialog.styles';
import labels from './AddExchangeDialog.labels';

// @withStyles(styles)
class AddExchangeDialog extends React.Component {
    static propTypes = {
        // classes: PropTypes.object.isRequired,
        exchanges: PropTypes.array.isRequired,
        open: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
    };

    state = {
        exchanges: this.props.exchanges.filter(item => !this.props.user.exchanges.find(userExchange => userExchange.name === item)),
        open: false,
        selectedExchange: this.props.exchanges[0],
    }

    handleChange = (event) => {
        this.setState({ selectedExchange: event.target.value });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        // const { classes } = this.props;
        // console.log(classes);
        console.log(this.props.open);
        const { exchanges, open, selectedExchange } = this.state;
        console.log(exchanges, open, exchanges);
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="add-exchange"
            >
                <DialogTitle id="add-exchange">{labels.addExchange}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add exchange
                    </DialogContentText>
                    <Select
                        value={selectedExchange}
                        onChange={this.handleChange}
                    >
                        {exchanges.map(exchange => (
                            <MenuItem key={exchange} value={exchange}>{exchange}</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        {labels.cancel}
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        {labels.submit}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AddExchangeDialog;
