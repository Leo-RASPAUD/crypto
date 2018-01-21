import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
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

    state = {
        displayedItems: this.props.data.data.balances.filter(filterLowCountItems).map(item => ({ balance: item, loading: true })),
    }

    componentDidMount = () => {
        const { length } = this.state.displayedItems;
        for (let index = 0; index < length; index += 1) {
            const element = this.state.displayedItems[index];
            console.log(element);
        }
    }

    render() {
        const { classes, data } = this.props;
        return (
            <Paper className={classes.paperWrapper} >
                <div className={classes.title}>{data.exchangeName}</div>
                <div className={classes.assetWrapper} >
                    {this.state.displayedItems.map((item) => {
                        console.log(item);
                        return (
                            <div
                                className={classes.asset}
                                key={item.balance.asset}
                            >
                                <div className={classes.iconWrapper}>
                                    <div style={{ position: 'relative' }}>
                                        <div className={classnames(`crypto-${item.balance.asset.toLowerCase()}`, classes.icon)}>
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
                                        {item.balance.asset} ({Number.parseFloat(item.balance.free).toFixed(4)})
                                    </div>
                                </div>
                                <div className={classes.iconWrapper} >
                                    {item.loading && <CircularProgress color="primary" size={24} />}
                                    {!item.loading && (<Icon color="primary" style={{ marginRight: 5 }}>show_chart</Icon>)}
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            </Paper>
        );
    }
}

export default AccountInformations;
