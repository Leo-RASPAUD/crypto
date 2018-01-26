import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import paths from 'components/App/App.paths';
import Login from 'components/Login/Login.container';
import Dashboard from 'components/Dashboard/Dashboard.container';
import Authenticated from 'components/Authenticated/Authenticated.container';
import Profile from 'components/Profile/Profile.container';

class App extends React.Component {
    static propTypes = {
        authenticated: PropTypes.bool.isRequired,
    };
    render() {
        return (
            <div
                style={(!this.props.authenticated && { marginTop: -64 }) || {}}
            >
                <Switch>
                    <Route exact path={paths.public.login} render={() => <Login />} />
                    <Authenticated exact path={paths.authenticated.dashboard} component={Dashboard} {...this.props} />
                    <Authenticated exact path={paths.authenticated.profile} component={Profile} {...this.props} />
                    <Redirect to={paths.public.login} />
                </Switch>
            </div >
        );
    }
}

export default App;
