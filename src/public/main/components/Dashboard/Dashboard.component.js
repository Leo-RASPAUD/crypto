import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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
});

@withStyles(styles)
class Dashboard extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        exchangesData: PropTypes.array.isRequired,
    };

    state = {
        linechartData: null,
    }

    displayPrices = (symbol) => {
        console.log(symbol.prices);
        const formattedPrices = symbol.prices.map((price) => {
            const time = new Date(price.time);
            const timeToDisplay = `${time.getHours() || 0}:${time.getMinutes() || 0}:${time.getSeconds() || 0}`;
            return {
                time: timeToDisplay,
                value: Math.abs(Number.parseFloat(price.value)),
            };
        });
        this.setState({ linechartData: formattedPrices });
    };

    render() {
        const { classes, user, exchangesData } = this.props;
        return (
            <div className={classes.wrapper}>
                <div>
                    User : {user.email}
                </div>
                <div>
                    Exchanges:
                    {user.exchanges.map(exchange => <div key={exchange.name}>{exchange.name}</div>)}
                </div>
                <div className={classes.exchanges}>
                    {exchangesData.map(exchange => (
                        <div key={exchange.name} className={classes.exchange}>
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
                        <LineChart width={600} height={300} data={this.state.linechartData}>
                            <Line dot={false} type="monotone" dataKey="value" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="time" />
                            <YAxis dataKey="value" />
                            <Tooltip />
                        </LineChart>
                    )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
