/* eslint-disable no-confusing-arrow, jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import SymbolTable from './SymbolTable/SymbolTable.component';
import Chart from './Chart/Chart.component';
import AccountInformations from './AccountInformations/AccountInformations.component';

import styles from './Dashboard.styles';

@withStyles(styles)
class Dashboard extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        getSymbols: PropTypes.func.isRequired,
        getPrices: PropTypes.func.isRequired,
        getTrend: PropTypes.func.isRequired,
        getLastPrice: PropTypes.func.isRequired,
        accountInformations: PropTypes.array.isRequired,
    };

    state = {
        loadingSymbols: true,
        exchangeLoadingName: null,
        symbolLoading: null,
        loadingPrices: false,
        prices: null,
        symbols: [],
    }

    componentDidMount = () => {
        const { getSymbols } = this.props;
        if (this.state.loadingSymbols) {
            getSymbols().then((symbols) => {
                this.setState({ symbols, loadingSymbols: false });
            });
        }
    }

    displayPrices = ({ exchangeName, symbol }) => {
        this.setState({ loadingPrices: true, symbolLoading: symbol, exchangeLoadingName: exchangeName });
        this.props.getPrices({ exchangeName, symbol }).then((prices) => {
            this.setState({ prices, loadingPrices: false });
        });
    }

    render() {
        const { classes, accountInformations, getTrend, getLastPrice } = this.props;
        return (
            <div className={classes.root}>
                <div>
                    <div className={classes.accountInformationsWrapper} >
                        {accountInformations.map(item => (
                            <AccountInformations
                                key={`accountInformations-${item.exchangeName}`}
                                data={item}
                                getTrend={getTrend}
                                getLastPrice={getLastPrice}
                            />
                        ))}
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div>
                            {this.state.loadingSymbols && <CircularProgress style={{ margin: 25 }} />}
                            {!this.state.loadingSymbols && (
                                <div className={classes.symbolTables}>
                                    {this.state.symbols.map(symbol => (
                                        <SymbolTable
                                            key={`symbol-table-${symbol.exchange}`}
                                            symbol={symbol}
                                            displayPrices={this.displayPrices}
                                            loadingPrices={this.state.loadingPrices}
                                            symbolLoading={this.state.symbolLoading}
                                            exchangeLoadingName={this.state.exchangeLoadingName}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            {this.state.prices && (
                                <Chart
                                    symbol={this.state.prices.symbol}
                                    prices={this.state.prices.prices}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
