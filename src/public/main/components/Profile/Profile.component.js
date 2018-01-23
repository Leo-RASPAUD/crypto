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
        addExchange: PropTypes.func.isRequired,
        removeExchange: PropTypes.func.isRequired,
    };

    componentDidMount = () => {
        this.props.getExchanges();
    }

    render() {
        const { isFetching, exchanges, user, addExchange, removeExchange } = this.props;
        return (
            <div>
                {isFetching && (<CircularProgress />)}
                {!isFetching && (<ProfilePresentation user={user} exchanges={exchanges} addExchange={addExchange} removeExchange={removeExchange} />)}
            </div>
        );
    }
}

export default Profile;
