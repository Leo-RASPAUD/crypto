import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Icon from 'material-ui/Icon';

import styles from './LoadingApp.style';

@withStyles(styles)
class LoadingApp extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        loadUserDetails: PropTypes.func.isRequired,
        goToDashboard: PropTypes.func.isRequired,
    };

    state = {
        loadingUserData: true,
        exchanges: [],
        itemsToLoad: -1,
    }

    componentDidMount = async () => {
        const { loadUserDetails, getAccountInformations } = this.props;
        const userDetails = await loadUserDetails();
        const { exchanges } = userDetails;
        const { length } = exchanges;
        this.setState({
            loadingUserData: false,
            itemsToLoad: length,
            exchanges: exchanges.map(exchange => ({ name: exchange.name, loading: true })),
        });

        for (let index = 0; index < length; index += 1) {
            const exchange = exchanges[index];
            getAccountInformations({ exchange }).then(() => {
                const exchangeState = this.state.exchanges.find(item => exchange.name === item.name);
                exchangeState.loading = false;
                this.setState({
                    exchanges: this.state.exchanges,
                    itemsToLoad: this.state.itemsToLoad - 1,
                });
            });
        }
    }

    componentDidUpdate = () => {
        const { goToDashboard } = this.props;
        if (this.state.itemsToLoad === 0) {
            goToDashboard();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.loadingWrapper}>
                <Paper className={classes.paperWrapper}>
                    <div className={classes.loadingIcon}>
                        <div className="cssload-container" >
                            <div className="cssload-shaft1" />
                            <div className="cssload-shaft2" />
                            <div className="cssload-shaft3" />
                            <div className="cssload-shaft4" />
                            <div className="cssload-shaft5" />
                            <div className="cssload-shaft6" />
                            <div className="cssload-shaft7" />
                            <div className="cssload-shaft8" />
                            <div className="cssload-shaft9" />
                            <div className="cssload-shaft10" />
                        </div>
                        <div>
                            Loading user data : {this.state.loadingUserData ? <CircularProgress /> : <Icon>check</Icon>}
                        </div>
                        <div>
                            {this.state.exchanges.length > 0 && this.state.exchanges.map(exchange => (
                                <div key={exchange.name}>
                                    <span>Loading {exchange.name}</span>
                                    {exchange.loading ? <CircularProgress /> : <Icon>check</Icon>}
                                </div>
                            ))}
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default LoadingApp;
