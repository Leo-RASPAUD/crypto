import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Icon from 'material-ui/Icon';
import classnames from 'classnames';
import styles from './AccountInformations.styles';

const THRESHOLD = 0.001;

const filterLowCountItems = balance => (balance.free > THRESHOLD || balance.locked > THRESHOLD);

const getCssTrends = ({ previousPrice, lastPrice }) => {
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
    return { icon, cssClass };
};

@withStyles(styles)
class AccountInformations extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
        getTrend: PropTypes.func.isRequired,
        getLastPrice: PropTypes.func.isRequired,
        displayPrices: PropTypes.func.isRequired,
    };

    state = {
        displayedItems: this.props.data.data.balances.filter(filterLowCountItems).map(item => ({ balance: item, loading: true })),
        total: 0,
        previousTotal: 0,
        itemsToLoad: this.props.data.data.balances.filter(filterLowCountItems).map(item => ({ balance: item, loading: true })).length,
    }

    componentDidMount = async () => {
        this.refreshValues();
        this.interval = setInterval(this.refreshValues, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /* eslint-disable no-param-reassign */
    setElementTrend = ({ element, lastEthPrice }) => (trend) => {
        const { prices } = trend;
        const previousPrice = prices[0].value;
        const lastPrice = prices[1].value;
        const { cssClass, icon } = getCssTrends({ previousPrice, lastPrice });
        element.cssClass = cssClass;
        element.icon = icon;
        element.loading = false;
        element.lastPrice = (Number.parseFloat(element.balance.free) + Number.parseFloat(element.balance.locked)) * lastEthPrice;
        if (element.balance.asset !== 'ETH') {
            element.lastPrice *= lastPrice;
        }
        element.lastPrice = Number.parseFloat(element.lastPrice.toFixed(2));
        this.setState({
            displayedItems: this.state.displayedItems,
            total: this.state.total + element.lastPrice,
            itemsToLoad: this.state.itemsToLoad - 1,
        });
    };

    refreshValues = async () => {
        this.setState({
            displayedItems: this.state.displayedItems.map(item => ({ ...item, loading: true })),
            previousTotal: this.state.total,
            total: 0,
            itemsToLoad: this.state.displayedItems.length,
        });
        const { getTrend, data, getLastPrice } = this.props;
        const resultLastPrice = await getLastPrice({ exchangeName: data.exchangeName, symbol: 'ETHUSDT' });
        const lastEthPrice = resultLastPrice.prices;
        const { length } = this.state.displayedItems;
        for (let index = 0; index < length; index += 1) {
            const element = this.state.displayedItems[index];
            let symbol = 'ETHUSDT';
            if (element.balance.asset !== 'ETH') {
                symbol = `${element.balance.asset}ETH`;
            }
            getTrend({ exchangeName: data.exchangeName, symbol }).then(this.setElementTrend({ element, lastEthPrice }));
        }
    }


    /* eslint-disable jsx-a11y/click-events-have-key-events */
    render() {
        const { classes, data, displayPrices } = this.props;
        const { cssClass, icon } = getCssTrends({ previousPrice: this.state.previousTotal, lastPrice: this.state.total });
        return (
            <Paper className={classes.paperWrapper}>
                <div className={classes.title}>
                    <div style={{ flex: 1 }}>
                        {data.exchangeName}
                    </div>
                    {this.state.itemsToLoad !== 0 && <CircularProgress color="primary" size={24} style={{ marginRight: 15 }} />}
                    {this.state.itemsToLoad === 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }} className={cssClass}>
                            <Icon style={{ marginRight: 5 }} className={classes[cssClass]}>
                                {icon}
                            </Icon>
                            <div>
                                ${this.state.total.toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>
                <div className={classes.assetWrapper} >
                    {this.state.displayedItems.map(item => (
                        <div
                            className={classes.asset}
                            key={item.balance.asset}
                            onClick={() => displayPrices({
                                exchangeName: data.exchangeName,
                                symbol: item.balance.asset === 'ETH' ? `${item.balance.asset}USDT` : `${item.balance.asset}ETH`,
                            })}
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
                                    {item.balance.asset} ({Number.parseFloat(item.balance.free + item.balance.locked).toFixed(4)})
                                </div>
                            </div>
                            <div className={classes.iconWrapper} >
                                {item.loading && <CircularProgress color="primary" size={24} />}
                                {!item.loading && (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Icon style={{ marginRight: 5 }} className={classes[item.cssClass]}>
                                            {item.icon}
                                        </Icon>
                                        <div>
                                            ${item.lastPrice}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Paper>
        );
    }
}

export default AccountInformations;
