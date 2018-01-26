import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Popover from 'material-ui/Popover';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';

import styles from './PopoverUser.styles';
import labels from './PopoverUser.labels';

@withStyles(styles)
class PopoverUser extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        popoverUserOpened: PropTypes.bool.isRequired,
        user: PropTypes.object,
        anchorElement: PropTypes.object,
        logout: PropTypes.func.isRequired,
        updateParentState: PropTypes.func.isRequired,
    };

    static defaultProps = {
        anchorElement: null,
        user: null,
    };

    state = {
        popoverUserOpened: this.props.popoverUserOpened,
        anchorElement: this.props.anchorElement,
        anchorOriginVertical: 'bottom',
        anchorOriginHorizontal: 'center',
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            anchorElement: nextProps.anchorElement,
            popoverUserOpened: nextProps.popoverUserOpened,
        });
    }

    logout = () => {
        this.props.logout();
        this.handleRequestClose();
    }

    handleRequestClose = () => {
        this.props.updateParentState({ popoverUserOpened: false });
    };


    render() {
        const {
            popoverUserOpened,
            anchorElement,
            anchorOriginVertical,
            anchorOriginHorizontal,
        } = this.state;
        const { user } = this.props;
        const { classes } = this.props;
        return (
            <div>
                {user && (
                    <Popover
                        classes={{ paper: classes.popover }}
                        open={popoverUserOpened}
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
                                {user.email}
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
                )}
            </div>
        );
    }
}
export default PopoverUser;
