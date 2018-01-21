/* eslint-disable no-confusing-arrow, jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import styles from './SymbolTable.styles';

@withStyles(styles)
class SymbolTable extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        symbol: PropTypes.object.isRequired,
        displayPrices: PropTypes.func.isRequired,
        loadingPrices: PropTypes.bool.isRequired,
        symbolLoading: PropTypes.string,
        exchangeLoadingName: PropTypes.string,
    };

    static defaultProps = {
        symbolLoading: null,
        exchangeLoadingName: null,
    };

    isSymbolLoading = (symbol, exchange) => {
        const { symbolLoading, loadingPrices, exchangeLoadingName } = this.props;
        if (loadingPrices && symbolLoading === symbol && exchange === exchangeLoadingName) {
            return (<CircularProgress size={24} style={{ marginLeft: 5 }} />);
        }
        return null;
    }

    render() {
        const { classes, symbol, displayPrices } = this.props;
        return (
            <Paper className={classes.symbolTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontSize: 18 }}>
                                {symbol.exchange}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {symbol.symbols.map(item => (
                            <TableRow
                                key={`symbol-${item}`}
                                hover
                                style={{ cursor: 'pointer' }}
                                onClick={() => displayPrices({
                                    exchangeName: symbol.exchange,
                                    symbol: item,
                                })}
                            >
                                <TableCell style={{ alignItems: 'center' }}>
                                    {item}
                                    {this.isSymbolLoading(item, symbol.exchange)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default SymbolTable;
