/* eslint-disable no-confusing-arrow, jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import SymbolTable from './SymbolTable/SymbolTable.component';

import styles from './Dashboard.styles';

@withStyles(styles)
class Dashboard extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        getSymbols: PropTypes.func.isRequired,
        getPrices: PropTypes.func.isRequired,
        accountInformations: PropTypes.array.isRequired,
    };

    state = {
        loadingSymbols: true,
        loadingPrices: false,
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
        console.log(this.state.loadingPrices, this.state.prices);
        this.setState({ loadingPrices: true });
        this.props.getPrices({ exchangeName, symbol }).then((prices) => {
            this.setState({ prices, loadingPrices: false });
        });
    }

    render() {
        const { classes, accountInformations } = this.props;
        return (
            <div className={classes.root}>
                Dashboard
                <div>
                    {this.state.loadingSymbols && <CircularProgress />}
                    {!this.state.loadingSymbols && (
                        <div className={classes.symbolTables}>
                            {this.state.symbols.map(symbol => (
                                <SymbolTable
                                    key={symbol.exchange}
                                    symbol={symbol}
                                    displayPrices={this.displayPrices}
                                />
                            ))}
                        </div>
                    )}
                    <div>
                        {accountInformations.map(item => (
                            <div key={item.exchangeName}>
                                <div>{item.exchangeName}</div>
                                {item.data.balances.map(balance => (
                                    <div key={balance.asset}>
                                        {balance.free}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
