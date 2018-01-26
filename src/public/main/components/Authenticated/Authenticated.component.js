import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import paths from 'components/App/App.paths';

class Authenticated extends React.Component {
    static propTypes = {
        authenticated: PropTypes.bool,
        component: PropTypes.func.isRequired,
    }
    static defaultProps = {
        authenticated: false,
    }
    render() {
        const { authenticated, component } = this.props;
        return (<Route
            render={(props) => {
                if (authenticated) {
                    return (React.createElement(component, { ...props }));
                }
                return (<Redirect to={paths.public.login} />);
            }}
        />);
    }
}

export default Authenticated;
