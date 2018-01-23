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
import { FormControl, FormHelperText } from 'material-ui/Form';

import styles from './CreateUserDialog.styles';
import labels from './CreateUserDialog.labels';

@withStyles(styles)
class CreateUserDialog extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired,
        createUser: PropTypes.func.isRequired,
    };

    state = {
        open: false,
        email: '',
        password: '',
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            open: nextProps.open,
        });
    }

    handleCancel = () => {
        this.setState({ open: false, email: '', password: '' });
    }

    handleChangeText = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = () => {
        this.props.createUser({
            credentials: {
                email: this.state.email,
                password: this.state.password,
            },
        });
        this.setState({ open: false, email: '', password: '' });
    }

    render() {
        const { classes } = this.props;
        const { open, email, password } = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.handleCancel}
                aria-labelledby="create-user"
            >
                <DialogTitle id="add-exchange">{labels.createUser}</DialogTitle>
                <DialogContent className={classes.dialogWrapper}>
                    <DialogContentText>{labels.createNewUser}</DialogContentText>
                    <div className={classes.keys} >
                        <FormControl error={email.length === 0} aria-describedby="name-email-text" style={{ minHeight: 70 }}>
                            <InputLabel htmlFor="name-email">{labels.email}</InputLabel>
                            <Input id="name-email" value={this.state.email} onChange={this.handleChangeText} name="email" />
                            {this.state.email.length === 0 && (<FormHelperText id="name-email-text">{labels.mandatory}</FormHelperText>)}
                        </FormControl>
                        <FormControl error={password.length === 0} aria-describedby="name-password-text" style={{ minHeight: 70 }}>
                            <InputLabel htmlFor="name-password">{labels.password}</InputLabel>
                            <Input id="name-password" type="password" value={this.state.password} onChange={this.handleChangeText} name="password" />
                            {this.state.password.length === 0 && (<FormHelperText id="name-password-text">{labels.mandatory}</FormHelperText>)}
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

export default CreateUserDialog;
