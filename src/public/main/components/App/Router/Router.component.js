import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import paths from 'components/App/App.paths';
import Login from 'components/Login/Login.container';
import LoadingApp from 'components/LoadingApp/LoadingApp.container';
import Dashboard from 'components/Dashboard/Dashboard.container';
import Authenticated from 'components/Authenticated/Authenticated.container';
import Profile from 'components/Profile/Profile.container';

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={paths.public.login} render={() => <Login />} />
                    <Route exact path={paths.public.loading} render={() => <LoadingApp />} />
                    <Authenticated exact path={paths.authenticated.dashboard} component={Dashboard} {...this.props} />
                    <Authenticated exact path={paths.authenticated.profile} component={Profile} {...this.props} />
                    <Redirect to={paths.public.login} />
                </Switch>
            </div>
        );
    }
}

export default App;
