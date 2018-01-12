import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import paths from 'components/App/App.paths';
import Home from 'components/Home/Home.container';

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={paths.public.home} render={() => <Home />} />
                    <Redirect to={paths.public.home} />
                </Switch>
            </div>
        );
    }
}

export default App;
