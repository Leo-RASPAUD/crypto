import PropTypes from 'prop-types';
import React from 'react';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import styles from './FormTextField.style';

/* eslint-disable */
class FormTextFieldComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(input) {
        return (event) => {
            this.setState({ value: event.target.value });
            input.onChange(event.target.value);
        };
    }

    render() {
        const {
            classes,
            input,
            meta: { touched, error },
            ...custom
        } = this.props;
        return (
            <TextField
                style={{ width: custom.fullWidth ? '100%' : 200 }}
                error={touched && error && error.length > 0}
                label={custom.label}
                id={custom.label}
                className={classes.textField}
                helperText={touched && error}
                onChange={this.onChangeHandler(input)}
                {...input}
                {...custom}
            />
        );
    }
}

FormTextFieldComponent.propTypes = {
    input: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormTextFieldComponent);