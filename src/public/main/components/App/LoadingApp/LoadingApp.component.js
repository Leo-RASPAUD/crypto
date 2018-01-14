import React from 'react';
import { withStyles } from 'material-ui/styles';
import styles from './LoadingApp.style';


class LoadingApp extends React.Component {
    render() {
        return (
            <div id="loader-wrapper">
                <div id="loader" />
                <div className="loader-section section-left" />
                <div className="loader-section section-right" />
            </div>
        );
    }
}

export default withStyles(styles)(LoadingApp);
