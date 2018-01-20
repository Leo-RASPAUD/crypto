/* eslint-disable no-confusing-arrow, jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import styles from './Dashboard.styles';

@withStyles(styles)
class Dashboard extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        getSymbols: PropTypes.func.isRequired,
        getPrices: PropTypes.func.isRequired,
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
                console.log(symbols);
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

    displaySymbols = (exchangeSymbols) => {
        const { classes } = this.props;
        return (
            <Paper key={exchangeSymbols.exchange} className={classes.symbolTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{exchangeSymbols.exchange}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exchangeSymbols.symbols.map(symbol => (
                            <TableRow
                                key={symbol}
                                hover
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.displayPrices({
                                    exchangeName: exchangeSymbols.exchange,
                                    symbol,
                                })}
                            >
                                <TableCell>{symbol}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                Dashboard
                <div>
                    {this.state.loadingSymbols && <CircularProgress />}
                    {!this.state.loadingSymbols && (
                        <div className={classes.symbolTables}>
                            {this.state.symbols.map(symbol => this.displaySymbols(symbol))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
