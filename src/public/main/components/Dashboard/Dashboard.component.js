/* eslint-disable no-confusing-arrow, jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Exchange from './Exchange/Exchange.container';
// import { CircularProgress } from 'material-ui/Progress';
// import Paper from 'material-ui/Paper';

// import SymbolTable from './SymbolTable/SymbolTable.component';
// import Chart from './Chart/Chart.component';
// import AccountInformations from './AccountInformations/AccountInformations.component';

import styles from './Dashboard.styles';
// import labels from './Dashboard.labels';

@withStyles(styles)
class Dashboard extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        exchanges: PropTypes.array.isRequired,
    };

    render() {
        const { classes, exchanges } = this.props;
        console.log(exchanges);
        return (
            <div>
                <div className={classes.exchangesWrapper}>
                    {exchanges.map(exchange => (
                        <Exchange
                            key={exchange._id}
                            exchange={exchange}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Dashboard;
