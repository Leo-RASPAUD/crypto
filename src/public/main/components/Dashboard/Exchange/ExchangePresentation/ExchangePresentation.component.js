import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';

import Symbol from './Symbol/Symbol.container';
import styles from './ExchangePresentation.styles';
import ExchangePresentationUtils from './ExchangePresentation.utils';

const filterLowCountItems = threshold => balance => (balance.free > threshold || balance.locked > threshold);

@withStyles(styles)
class Exchange extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        exchange: PropTypes.object.isRequired,
    };

    state = {
        previousTotal: 0,
        total: 0,
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ total: nextProps.exchange.total || 0 });
    }

    render() {
        const { classes, exchange } = this.props;
        const { cssClass, icon } = ExchangePresentationUtils.getCssTrends({ previousPrice: this.state.previousTotal, currentPrice: this.state.total });
        return (
            <Paper className={classes.paperWrapper}>
                <div className={classes.title}>
                    <div style={{ flex: 1 }}>
                        {exchange.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }} className={cssClass}>
                        <Icon style={{ marginRight: 5 }} className={classes[cssClass]}>
                            {icon}
                        </Icon>
                        <div>
                            ${this.state.total.toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className={classes.assetWrapper} >
                    {exchange.isLoading && <CircularProgress />}
                    {!exchange.isLoading && exchange.isError && (<div>Error</div>)}
                    {!exchange.isLoading && !exchange.isError && exchange.data.balances.filter(filterLowCountItems(exchange.threshold)).map(symbol => (
                        <Symbol
                            key={symbol.asset}
                            symbol={symbol}
                            exchangeName={exchange.name}
                        />
                    ))}
                </div>
            </Paper>
        );
    }
}

export default Exchange;
