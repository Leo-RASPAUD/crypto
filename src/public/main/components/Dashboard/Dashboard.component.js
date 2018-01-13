import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = () => {};

@withStyles(styles)
class Dashboard extends React.Component {
    render() {
        return (
            <div>
                Logged in
            </div>
        );
    }
}

export default Dashboard;
