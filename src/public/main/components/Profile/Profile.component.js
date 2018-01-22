import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

import ProfilePresentation from './ProfilePresentation/ProfilePresentation.component';

class Profile extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        exchanges: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        getExchanges: PropTypes.func.isRequired,
    };

    state = {
        user: this.props.user,
        isFetching: this.props.isFetching,
        exchanges: this.props.exchanges,
    }

    componentDidMount = () => {
        this.props.getExchanges().then(this.setState({ isFetching: false }));
    }

    render() {
        const { isFetching, exchanges } = this.state;
        return (
            <div>
                {isFetching && (<CircularProgress />)}
                {!isFetching && (<ProfilePresentation user={this.state.user} exchanges={exchanges} />)}
            </div>
        );
    }
}

export default Profile;
