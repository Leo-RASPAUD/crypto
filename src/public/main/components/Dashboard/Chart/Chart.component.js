/* eslint-disable no-confusing-arrow, jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

import styles from './Chart.styles';

@withStyles(styles)
class Chart extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        symbol: PropTypes.string.isRequired,
        prices: PropTypes.array.isRequired,
    };

    /* eslint-disable no-nested-ternary */
    render() {
        const { classes, symbol, prices } = this.props;
        let previousPrice = 0;
        let lastPrice = 0;
        if (prices.length > 2) {
            previousPrice = prices[prices.length - 2].value;
            lastPrice = prices[prices.length - 1].value;
        }
        let cssClass;
        let icon;
        if (lastPrice > previousPrice) {
            cssClass = 'trendingUp';
            icon = 'trending_up';
        } else if (lastPrice < previousPrice) {
            cssClass = 'trendingDown';
            icon = 'trending_down';
        } else {
            cssClass = 'trendingFlat';
            icon = 'trending_flat';
        }
        return (
            <Paper className={classes.paperWrapper}>
                <div className={classes.title}>
                    <div style={{ flex: 1 }}>{symbol}</div>
                    <div className={classes[cssClass]} >
                        {lastPrice}
                        <Icon style={{ marginLeft: 10 }}>
                            {icon}
                        </Icon>
                    </div>
                </div>
                <div className={classes.content}>
                    <LineChart width={700} height={350} data={prices}>
                        <Line dot={false} type="monotone" dataKey="value" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" />
                        <YAxis dataKey="value" width={100} />
                        <Tooltip />
                    </LineChart>
                </div>
            </Paper>
        );
    }
}

export default Chart;
