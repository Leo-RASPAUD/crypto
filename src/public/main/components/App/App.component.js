import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Popover from 'material-ui/Popover';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import LoadingBar from 'react-redux-loading-bar';
import localStorageConstants from 'constants/localStorage.constants';
import SnackbarComponent from 'components/commons/Snackbar/Snackbar.container';
import RouterComponent from './Router/Router.component';

import styles from './App.styles';
import labels from './App.labels';

@withStyles(styles)
class App extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        authenticated: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired,
        goToDashboard: PropTypes.func.isRequired,
        goToProfile: PropTypes.func.isRequired,
    };

    state = {
        popoverOpen: false,
        anchorElement: null,
        anchorOriginVertical: 'bottom',
        anchorOriginHorizontal: 'center',
    }


    componentDidMount = async () => {
        const userId = window.localStorage.getItem(localStorageConstants.userId);
        const { redirectToLogin, goToLoading } = this.props;
        if (!userId) {
            redirectToLogin();
        } else {
            goToLoading();
        }
    }

    getPopover = (classes) => {
        const {
            popoverOpen,
            anchorElement,
            anchorOriginVertical,
            anchorOriginHorizontal,
        } = this.state;
        return (
            <Popover
                classes={{ paper: classes.popover }}
                open={popoverOpen}
                anchorEl={anchorElement}
                onClose={this.handleRequestClose}
                anchorOrigin={{
                    vertical: anchorOriginVertical,
                    horizontal: anchorOriginHorizontal,
                }}
            >
                <div className={classes.contentWrapper} >
                    <Avatar className={classes.avatarClass} >
                        <Icon>account_circle</Icon>
                    </Avatar>
                    <div className={classes.username} >
                        {this.props.user.email}
                    </div>
                </div>
                <div className={classes.buttons} >
                    <Button
                        onClick={this.logout}
                        color="accent"
                        raised
                        classes={{
                            root: classes.signOutButton,
                        }}
                    >
                        {labels.signOut}
                    </Button>
                </div>
            </Popover>
        );
    }

    logout = () => {
        this.props.logout();
        this.handleRequestClose();
    }

    handleClickButton = () => {
        this.setState({
            popoverOpen: true,
            anchorElement: this.button,
        });
    };

    handleRequestClose = () => {
        this.setState({
            popoverOpen: false,
        });
    };

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    render() {
        const { classes, goToDashboard, goToProfile } = this.props;
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {this.getPopover(this.props.classes)}
                <AppBar
                    position="static"
                    color="default"
                    className={classes.appbar}
                    style={(!this.props.authenticated && { backgroundColor: 'transparent' }) || { backgroundColor: 'white' }}
                >
                    <Toolbar>
                        <Typography
                            type="title"
                            className={classes.toolbarItem}
                            style={(!this.props.authenticated && { color: 'white', flex: 1, marginLeft: 25 }) || { flex: 1, marginLeft: 25 }}
                        >
                            CryptoLive
                        </Typography>
                        {this.props.authenticated && (
                            <div className={classes.toolbarItems} >
                                <Typography type="subheading" className={classes.toolbarItem} onClick={goToDashboard}>
                                    {labels.dashboard}
                                </Typography>
                                <Typography type="subheading" className={classes.toolbarItem} onClick={goToProfile}>
                                    {labels.profile}
                                </Typography>
                                <div ref={(node) => { this.button = node; }} onClick={this.handleClickButton}>
                                    <IconButton className={classes.toolbarItem}>
                                        account_circle
                                    </IconButton>
                                </div>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <SnackbarComponent />
                <LoadingBar className={classes.loadingBar} />
                <div style={(!this.props.authenticated && { marginTop: -64 }) || {}}>
                    <RouterComponent authenticated={this.props.authenticated} location={this.props.location} />
                </div>
            </div>
        );
    }
}
export default App;
