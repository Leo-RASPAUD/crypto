import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import localStorageConstants from 'constants/localStorage.constants';
import RouterComponent from './Router/Router.component';

class App extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        authenticated: PropTypes.bool.isRequired,
    };

    componentDidMount = async () => {
        const userId = window.localStorage.getItem(localStorageConstants.userId);
        const { redirectToLogin, goToLoading } = this.props;
        if (!userId) {
            redirectToLogin();
        } else {
            goToLoading();
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            Crypto
                        </Typography>
                    </Toolbar>
                </AppBar>
                <RouterComponent authenticated={this.props.authenticated} location={this.props.location} />
            </div>
        );
    }
}
export default App;
