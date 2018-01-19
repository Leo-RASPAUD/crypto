/* eslint-disable no-confusing-arrow, jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const styles = theme => ({
    root: {
        width: 150,
        marginTop: theme.spacing.unit * 3,
        overflowY: 'auto',
        height: 500,
    },
    table: {
    },
    exchanges: {
        display: 'flex',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    exchange: {
        margin: 25,
    },
    balanceItem: {
        backgroundColor: '#03A9F4',
        borderRadius: 5,
        padding: 5,
        margin: 5,
        cursor: 'pointer',
    },
});

const formatPrices = prices => prices.map((price) => {
    const time = new Date(price.time);
    const timeToDisplay = `${time.getHours() || 0}:${time.getMinutes() || 0}:${time.getSeconds() || 0}`;
    return {
        time: timeToDisplay,
        value: Math.abs(Number.parseFloat(price.value)),
    };
});

@withStyles(styles)
class Dashboard extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        exchangesData: PropTypes.array.isRequired,
        accountInfo: PropTypes.object.isRequired,
    };

    state = {
        linechartData: null,
        selectedCoin: '',
    }

    getCurrentPrice = (exchange, symbol) => {
        const result = exchange.symbols.find(item => item.name === `${symbol}ETH`);
        return result ? result.prices[result.prices.length - 1].value : 0;
    }
    getCurrentPriceDollars = (isEth, exchange, quantity, currentPrice) => {
        console.log(isEth, exchange, quantity, currentPrice);
        const result = exchange.symbols.find(item => item.name === 'ETHUSDT');
        const price = result ? result.prices[result.prices.length - 1].value : 0;
        const resultPrice = isEth ? price * quantity : price * quantity * currentPrice;
        console.log(resultPrice);
        return resultPrice;
    }

    getDealPrice = (orders, asset) => {
        const pair = asset === 'ETH' || asset === 'BTC' ? `${asset}USDT` : `${asset}ETH`;
        const results = orders.map(order => order.find(item => item.pair === pair)).filter(isNull => isNull);
        if (results) {
            return results.reduce((a, b) => a + b.dealPrice, 0);
        }
        return 'N/A';
    }

    getDiff = (isEth, exchange, free, locked, currentPrice, buyPrice) => {
        const result = exchange.symbols.find(item => item.name === 'ETHUSDT');
        const price = result ? result.prices[result.prices.length - 1].value : 0;
        const quantity = Number.parseFloat(locked || 0) + Number.parseFloat(free || 0);
        const buyPriceUsd = price * quantity * buyPrice;
        const currentPriceUsd = price * quantity * currentPrice;
        console.log(quantity, price, buyPriceUsd, currentPriceUsd);
        const priceDiff = currentPriceUsd - buyPriceUsd;
        return isEth ? 0 : priceDiff;
    }

    getTotal = (exchangesData, accountInfo) => exchangesData.reduce((a, b) => {
        const c = accountInfo[b.name].balances.map((item) => {
            console.log(item);
            console.log(this.getCurrentPrice(b, item.asset));
            const test = (item.free > 0.001 || item.locked > 0.001) ?
                this.getCurrentPriceDollars(
                    item.asset === 'ETH',
                    b,
                    Number.parseFloat(item.locked || 0) + Number.parseFloat(item.free || 0),
                    this.getCurrentPrice(b, item.asset),
                ) : 0;
            console.log(test);
            return Number.parseFloat(test);
        }).reduce((e, f) => e + f, 0);
        console.log(a, c, Number.parseFloat(a + c));
        return Number.parseFloat(a + c);
    }, 0);

    selectValue = (exchange, asset) => {
        const selectedCoin = asset === 'ETH' || asset === 'BTC' ? `${asset}USDT` : `${asset}ETH`;
        const symbol = exchange.symbols.find(exchangeSymbol => exchangeSymbol.name === selectedCoin);
        const formattedPrices = formatPrices(symbol.prices);
        this.setState({ linechartData: formattedPrices, selectedCoin });
    }

    displayPrices = (symbol) => {
        const formattedPrices = formatPrices(symbol.prices);
        this.setState({ linechartData: formattedPrices, selectedCoin: symbol.name });
    };

    render() {
        const { classes, user, exchangesData, accountInfo } = this.props;
        return (
            <div className={classes.wrapper}>
                <div>
                    User : {user.email}
                </div>
                <div>
                    Exchanges:
                    {user.exchanges.map(exchange => <div key={`${exchange.name}title`}>{exchange.name}</div>)}
                </div>
                <div>{this.getTotal(exchangesData, accountInfo)}</div>
                <div className={classes.exchanges}>
                    {exchangesData.map(exchange => (
                        <div key={`${exchange.name}data`} className={classes.exchange}>
                            <div>Exchange name: {exchange.name}</div>
                            <div>
                                <div>Account info</div>
                                <div>
                                    {accountInfo[exchange.name].balances.map(item =>
                                        (item.free > 0.001 || item.locked > 0.001) ? (
                                            <div key={`${exchange.name}-${item.asset}`}>
                                                <div
                                                    className={classes.balanceItem}
                                                    onClick={() => this.selectValue(exchange, item.asset)}
                                                >
                                                    <div>{item.asset}: </div>
                                                    <div>{item.free}</div>
                                                    <div>{item.locked}</div>
                                                </div>
                                                <div>
                                                    <span>Buy price: </span>
                                                    <span>{this.getDealPrice(accountInfo[exchange.name].orders, item.asset)}</span>
                                                </div>
                                                <div>
                                                    <span>Current price: </span>
                                                    <div>
                                                        {this.getCurrentPrice(exchange, item.asset)}
                                                    </div>
                                                    <div>
                                                        ${this.getCurrentPriceDollars(item.asset === 'ETH', exchange, item.free, this.getCurrentPrice(exchange, item.asset))}
                                                    </div>
                                                    <div>
                                                        ${this.getCurrentPriceDollars(item.asset === 'ETH', exchange, item.locked, this.getCurrentPrice(exchange, item.asset))} (locked)
                                                    </div>
                                                    <div>
                                                        Diff : {this.getDiff(
                                                            item.asset === 'ETH', exchange,
                                                            item.free,
                                                            item.locked,
                                                            this.getCurrentPrice(exchange, item.asset),
                                                            this.getDealPrice(accountInfo[exchange.name].orders, item.asset),
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null)}
                                </div>
                            </div>
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Symbol</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {exchange.symbols.map(symbol => (
                                            <TableRow
                                                key={symbol._id}
                                                hover
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => this.displayPrices(symbol)}
                                            >
                                                <TableCell>{symbol.name}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    ))}
                    {this.state.linechartData && (
                        <div>
                            <div>{this.state.selectedCoin}</div>
                            <LineChart width={600} height={300} data={this.state.linechartData}>
                                <Line dot={false} type="monotone" dataKey="value" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="time" />
                                <YAxis dataKey="value" />
                                <Tooltip />
                                <Legend />
                            </LineChart>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
