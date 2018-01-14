/* eslint react/no-did-update-set-state: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import RouterComponent from './Router/Router.component';

class App extends React.Component {
    render() {
        return (
            <RouterComponent
                authenticated={this.props.authenticated}
                location={this.props.location}
            />);
    }
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

export default App;
