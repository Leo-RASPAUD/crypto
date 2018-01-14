import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import Button from 'material-ui/Button';
import FormTextFieldComponent from 'components/Commons/FormTextField/FormTextField.component';
import labels from './Login.labels';
import styles from './Login.style';

class Login extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        submitLogin: PropTypes.func.isRequired,
        error: PropTypes.string,
    };

    static defaultProps = {
        error: '',
    };


    render() {
        const {
            classes,
            handleSubmit,
            submitLogin,
            error,
        } = this.props;
        return (
            <form onSubmit={handleSubmit(submitLogin)} className={classes.loginForm}>
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
                <Button raised color="primary" type="submit">
                    {labels.submit}
                </Button>
                <div className={classes.errorMessage}>
                    {error}
                </div>
            </form>
        );
    }
}

export default compose(withStyles(styles), reduxForm({ form: 'loginForm' }))(Login);
