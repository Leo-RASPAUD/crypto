import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

import ProfilePresentation from './ProfilePresentation/ProfilePresentation.component';

class Profile extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        exchanges: PropTypes.array.isRequired,
        isFetchingExchanges: PropTypes.bool.isRequired,
        isFetchingUser: PropTypes.bool.isRequired,
        getExchanges: PropTypes.func.isRequired,
        addExchange: PropTypes.func.isRequired,
        removeExchange: PropTypes.func.isRequired,
        getUserDetails: PropTypes.func.isRequired,
    };

    componentDidMount = () => {
        this.props.getExchanges();
        this.props.getUserDetails();
    }

    render() {
        const { isFetchingUser, isFetchingExchanges, exchanges, user, addExchange, removeExchange } = this.props;
        return (isFetchingExchanges || isFetchingUser) ?
            <CircularProgress /> :
            <ProfilePresentation user={user} exchanges={exchanges} addExchange={addExchange} removeExchange={removeExchange} />;
    }
}

export default Profile;
