/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import classnames from 'classnames';

import AddExchangeDialog from './AddExchangeDialog/AddExchangeDialog.component';
import styles from './ProfilePresentation.styles';
import labels from './ProfilePresentation.labels';

@withStyles(styles)
class ProfilePresentation extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        exchanges: PropTypes.array.isRequired,
    };

    state = {
        user: this.props.user,
        exchanges: this.props.exchanges,
        isDialogOpen: false,
    }

    addExchange = () => {
        this.setState({ isDialogOpen: true });
    }


    render() {
        const { classes } = this.props;
        const { user, exchanges, isDialogOpen } = this.state;
        return (
            <div className={classes.root}>
                <AddExchangeDialog open={isDialogOpen} exchanges={exchanges} user={user} />
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
                        {user.exchanges.map((exchange, index) => (
                            <div className={classes.item} key={`${index}${exchange.name}`} >
                                <Icon color="primary" className={classes.icon} >compare_arrows</Icon>
                                <span>{exchange.name}</span>
                            </div>
                        ))}
                        <div
                            className={classnames(classes.item, classes.addNewExchange)}
                            onClick={this.addExchange}
                        >
                            <Icon
                                className={classes.icon}
                                style={{ color: '#4caf50' }}
                            >
                                add
                            </Icon>
                            <span>{labels.addNewExchange}</span>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default ProfilePresentation;