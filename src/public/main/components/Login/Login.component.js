import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import FormTextFieldComponent from 'components/commons/FormTextField/FormTextField.component';
import CreateUserDialog from './CreateUserDialog/CreateUserDialog.component';

import labels from './Login.labels';
import styles from './Login.style';

class Login extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        submitLogin: PropTypes.func.isRequired,
        createUser: PropTypes.func.isRequired,
        error: PropTypes.string,
    };

    static defaultProps = {
        error: '',
    };

    state = {
        isDialogOpen: false,
    }

    openCreateUser = () => {
        this.setState({ isDialogOpen: true });
    }

    render() {
        const {
            classes,
            handleSubmit,
            submitLogin,
            error,
            createUser,
        } = this.props;
        const { isDialogOpen } = this.state;
        return (
            <div className={classes.loginWrapper}>
                <CreateUserDialog open={isDialogOpen} createUser={createUser} />
                <Paper className={classes.paperWrapper}>
                    <div className={classes.loginHeader} />
                    <form onSubmit={handleSubmit(submitLogin)} className={classes.paperForm}>
                        <Field
                            name="email"
                            margin="dense"
                            component={FormTextFieldComponent}
                            type="text"
                            label={labels.username}
                            autoFocus
                            required
                            fullWidth
                        />
                        <Field
                            name="password"
                            margin="dense"
                            component={FormTextFieldComponent}
                            type="password"
                            label={labels.password}
                            required
                            fullWidth
                        />
                        <div style={{ display: 'flex' }}>
                            <Button raised color="primary" onClick={this.openCreateUser} style={{ margin: 15 }}>
                                {labels.create}
                            </Button>
                            <Button raised type="submit" style={{ margin: 15, color: 'white', backgroundColor: '#4CAF50' }}>
                                {labels.submit}
                            </Button>
                        </div>
                        <div className={classes.errorMessage}>
                            {error}
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default compose(withStyles(styles), reduxForm({ form: 'loginForm' }))(Login);
