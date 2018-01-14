import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = () => { };

@withStyles(styles)
class Dashboard extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    };
    render() {
        const { classes, user } = this.props;
        return (
            <div className={classes.test}>
                <div>
                    User : {user.email}
                </div>
                Exchanges:
                {user.exchanges.map(exchange => <div key={user.email}>{exchange.name}</div>)}
            </div>
        );
    }
}

export default Dashboard;
