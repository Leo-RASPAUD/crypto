import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 100,
        width: 100,
    },
});

@withStyles(styles)
class Dashboard extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        exchangesData: PropTypes.array.isRequired,
    };
    render() {
        const { classes, user, exchangesData } = this.props;
        return (
            <div className={classes.test}>
                <div>
                    User : {user.email}
                </div>
                Exchanges:
                {user.exchanges.map(exchange => <div key={user.email}>{exchange.name}</div>)}

                {exchangesData.map(exchange => (
                    <div>
                        <div>Exchange name: {exchange.name}</div>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Symbol</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {exchange.symbols.map(symbol => (
                                        <TableRow key={symbol._id}>
                                            <TableCell>{symbol.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                ))}
            </div>
        );
    }
}

export default Dashboard;
