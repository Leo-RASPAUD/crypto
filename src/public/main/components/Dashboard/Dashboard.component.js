/* eslint-disable no-confusing-arrow, jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Exchange from './Exchange/Exchange.container';
import Chart from './Chart/Chart.component';

import styles from './Dashboard.styles';
import labels from './Dashboard.labels';

@withStyles(styles)
class Dashboard extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        exchanges: PropTypes.array.isRequired,
        prices: PropTypes.object,
    };

    static defaultProps = {
        prices: null,
    };

    render() {
        const { classes, exchanges, prices } = this.props;
        return (
            <div>
                {exchanges.length === 0 && (
                    <div className={classes.noDataWrapper}>
                        <Paper className={classes.noData}>
                            <div>
                                {labels.welcome}
                            </div>
                            <div style={{ paddingTop: 50 }}>
                                {labels.goToProfile}
                            </div>
                        </Paper>
                    </div>
                )}
                <div className={classes.exchangesWrapper}>
                    {exchanges.map(exchange => (<Exchange key={exchange._id} exchange={exchange} />))}
                </div>
                <div>
                    {prices && (
                        <Chart
                            symbol={prices.symbol}
                            prices={prices.prices}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
