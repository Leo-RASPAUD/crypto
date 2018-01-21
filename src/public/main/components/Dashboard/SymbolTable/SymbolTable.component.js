/* eslint-disable no-confusing-arrow, jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import styles from './SymbolTable.styles';

@withStyles(styles)
class SymbolTable extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        symbol: PropTypes.object.isRequired,
        displayPrices: PropTypes.func.isRequired,
    };

    render() {
        const { classes, symbol, displayPrices } = this.props;
        return (
            <Paper className={classes.symbolTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{symbol.exchange}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {symbol.symbols.map(item => (
                            <TableRow
                                key={item}
                                hover
                                style={{ cursor: 'pointer' }}
                                onClick={() => displayPrices({
                                    exchangeName: symbol.exchange,
                                    item,
                                })}
                            >
                                <TableCell>{item}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default SymbolTable;
