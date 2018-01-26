import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import LoadingBar from 'react-redux-loading-bar';
import SnackbarComponent from 'components/commons/Snackbar/Snackbar.container';
import RouterComponent from './Router/Router.component';
import PopoverUser from './PopoverUser/PopoverUser.component';
import LoadingApp from './LoadingApp/LoadingApp.component';

import styles from './App.styles';
import labels from './App.labels';

@withStyles(styles)
class App extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        user: PropTypes.object,
        logout: PropTypes.func.isRequired,
        goToDashboard: PropTypes.func.isRequired,
        goToProfile: PropTypes.func.isRequired,
        checkCredentials: PropTypes.func.isRequired,
        isUserLoading: PropTypes.bool.isRequired,
        isUserAuthenticated: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        user: null,
    }

    state = {
        popoverUserOpened: false,
        anchorElement: null,
    };

    componentDidMount = async () => {
        this.props.checkCredentials();
    }

    openPopoverUser = () => {
        this.setState({ popoverUserOpened: true, anchorElement: this.button });
    }

    updateParentState = (newState) => {
        this.setState(newState);
    }

    render() {
        const { classes, goToDashboard, goToProfile, user, logout, isUserLoading, isUserAuthenticated } = this.props;
        const { popoverUserOpened, anchorElement } = this.state;
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {isUserLoading && <LoadingApp />}
                {!isUserLoading && (
                    <div>
                        <PopoverUser
                            user={user}
                            logout={logout}
                            popoverUserOpened={popoverUserOpened}
                            updateParentState={this.updateParentState}
                            anchorElement={anchorElement}
                        />
                        <AppBar
                            position="static"
                            color="default"
                            className={classes.appbar}
                            style={(!user && { backgroundColor: 'transparent' }) || { backgroundColor: 'white' }}
                        >
                            <Toolbar>
                                <Typography
                                    type="title"
                                    className={classes.toolbarItem}
                                    style={(!user && { color: 'white', flex: 1, marginLeft: 25 }) || { flex: 1, marginLeft: 25 }}
                                >
                                    CryptoLive
                                </Typography>
                                {user && (
                                    <div className={classes.toolbarItems} >
                                        <Typography type="subheading" className={classes.toolbarItem} onClick={goToDashboard}>
                                            {labels.dashboard}
                                        </Typography>
                                        <Typography type="subheading" className={classes.toolbarItem} onClick={goToProfile}>
                                            {labels.profile}
                                        </Typography>
                                        <div ref={(node) => { this.button = node; }} onClick={this.openPopoverUser}>
                                            <IconButton className={classes.toolbarItem}>
                                                account_circle
                                            </IconButton>
                                        </div>
                                    </div>
                                )}
                            </Toolbar>
                        </AppBar>
                        <LoadingBar className={classes.loadingBar} />
                        <SnackbarComponent />
                        <RouterComponent
                            authenticated={isUserAuthenticated}
                            location={this.props.location}
                        />
                    </div>
                )}
            </div>
        );
    }
}
export default App;
