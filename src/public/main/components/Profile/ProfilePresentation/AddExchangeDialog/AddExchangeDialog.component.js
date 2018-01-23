/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

import styles from './AddExchangeDialog.styles';
import labels from './AddExchangeDialog.labels';

@withStyles(styles)
class AddExchangeDialog extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        exchanges: PropTypes.array.isRequired,
        open: PropTypes.bool.isRequired,
        addExchange: PropTypes.func.isRequired,
    };

    state = {
        exchanges: [],
        open: false,
        selectedExchange: '',
        apiKey: '',
        apiSecret: '',
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            exchanges: nextProps.exchanges,
            open: nextProps.open,
            selectedExchange: nextProps.exchanges[0],
        });
    }

    handleChange = (event) => {
        this.setState({ selectedExchange: event.target.value });
    }

    handleChangeText = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCancel = () => {
        this.setState({ open: false });
    }

    handleSubmit = () => {
        this.props.addExchange({
            exchange: {
                name: this.state.selectedExchange,
                apiKey: this.state.apiKey,
                apiSecret: this.state.apiSecret,
            },
        });
        this.setState({ open: false, apiKey: '', apiSecret: '' });
    }

    render() {
        const { classes } = this.props;
        const { exchanges, open, selectedExchange, apiKey, apiSecret } = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.handleCancel}
                aria-labelledby="add-exchange"
            >
                <DialogTitle id="add-exchange">{labels.addExchange}</DialogTitle>
                <DialogContent className={classes.dialogWrapper}>
                    <DialogContentText>{labels.addExchange}</DialogContentText>
                    <Select value={selectedExchange} onChange={this.handleChange} className={classes.select}>
                        {exchanges.map(exchange => (
                            <MenuItem key={exchange} value={exchange}>{exchange}</MenuItem>
                        ))}
                    </Select>
                    <div className={classes.keys} >
                        <FormControl error={apiKey.length === 0} aria-describedby="name-apiKey-text" style={{ minHeight: 70 }}>
                            <InputLabel htmlFor="name-apiKey">{labels.apiKey}</InputLabel>
                            <Input id="name-apiKey" value={this.state.apiKey} onChange={this.handleChangeText} name="apiKey" />
                            {this.state.apiKey.length === 0 && (<FormHelperText id="name-apiKey-text">{labels.mandatory}</FormHelperText>)}
                        </FormControl>
                        <FormControl error={apiSecret.length === 0} aria-describedby="name-apiSecret-text" style={{ minHeight: 70 }}>
                            <InputLabel htmlFor="name-apiSecret">{labels.apiSecret}</InputLabel>
                            <Input id="name-apiSecret" value={this.state.apiSecret} onChange={this.handleChangeText} name="apiSecret" />
                            {this.state.apiSecret.length === 0 && (<FormHelperText id="name-apiSecret-text">{labels.mandatory}</FormHelperText>)}
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        {labels.cancel}
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        {labels.submit}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AddExchangeDialog;
