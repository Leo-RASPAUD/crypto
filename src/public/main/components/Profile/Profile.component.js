import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';

import styles from './Profile.styles';
import labels from './Profile.labels';

@withStyles(styles)
class Profile extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    };

    state = {
        user: this.props.user,
    }


    render() {
        const { classes } = this.props;
        const { user } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.profileTitle} >
                    {labels.profile}
                </div>
                <div style={{ display: 'flex' }}>
                    <Paper className={classes.personalInformations} >
                        <div className={classes.subtitle} >
                            {labels.myInformations}
                        </div>
                        <div className={classes.item} >
                            <Icon color="primary" className={classes.icon} >mail</Icon>
                            <span>{user.email}</span>
                        </div>
                    </Paper>
                    <Paper className={classes.exchangeWrapper}>
                        <div className={classes.subtitle} >
                            {labels.exchanges}
                        </div>
                        {user.exchanges.map(exchange => (
                            <div className={classes.item}>
                                <Icon color="primary" className={classes.icon} >compare_arrows</Icon>
                                <span>{exchange.name}</span>
                                
                            </div>
                        ))}
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Profile;
