/* eslint react/no-did-update-set-state: 0 */
import React from 'react';
import localStorageConstants from 'constants/localStorage.constants';
import PropTypes from 'prop-types';
import RouterComponent from './Router/Router.component';
import LoadingApp from './LoadingApp/LoadingApp.component';
import userService from '../../services/user.service';

class App extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        authenticated: PropTypes.bool.isRequired,
        setUser: PropTypes.func.isRequired,
        loadingUser: PropTypes.bool.isRequired,
    };

    componentDidMount = async () => {
        const userId = window.localStorage.getItem(localStorageConstants.userId);
        console.log(userId);
        if (!userId) {
            this.props.setUser({ user: null, loadingUser: false });
        } else {
            const { json, status } = await userService.getUserDetails(userId);
            console.log(json, status);
            if (status === 200) {
                this.props.setUser({ user: json, loadingUser: false });
            } else {
                this.props.setUser({ loadingUser: false });
            }
        }
    }
    render() {
        return (
            this.props.loadingUser
                ? (<LoadingApp />)
                : (<RouterComponent
                    authenticated={this.props.authenticated}
                    location={this.props.location}
                />)
        );
    }
}
export default App;
