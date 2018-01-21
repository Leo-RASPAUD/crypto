/* eslint-disable no-confusing-arrow, jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import classnames from 'classnames';
import styles from './AccountInformations.styles';

const THRESHOLD = 0.001;

const filterLowCountItems = balance => (balance.free || balance.locked) > THRESHOLD;

@withStyles(styles)
class AccountInformations extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
    };

    render() {
        const { classes, data } = this.props;
        console.log(data, classes);
        return (
            <Paper className={classes.paperWrapper} >
                <div className={classes.title}>{data.exchangeName}</div>
                <div className={classes.assetWrapper} >
                    {data.data.balances.filter(filterLowCountItems).map((balance) => {
                        console.log('test');
                        return (
                            <div
                                className={classes.asset}
                                key={balance.asset}
                            >
                                <div className={classes.iconWrapper}>
                                    <div style={{ position: 'relative' }}>
                                        <div className={classnames(`crypto-${balance.asset.toLowerCase()}`, classes.icon)}>
                                            <span className="path1" />
                                            <span className="path2" />
                                            <span className="path3" />
                                            <span className="path4" />
                                            <span className="path5" />
                                            <span className="path6" />
                                            <span className="path7" />
                                        </div>
                                        <Icon color="primary" className={classes.noIcon}>
                                            monetization_on
                                        </Icon>
                                    </div>
                                    <div>
                                        {balance.asset} ({Number.parseFloat(balance.free).toFixed(4)})
                                    </div>
                                </div>
                                <div className={classes.iconWrapper} >
                                    <Icon color="primary" style={{ marginRight: 5 }}>show_chart</Icon>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Paper>
        );
    }
}

export default AccountInformations;
