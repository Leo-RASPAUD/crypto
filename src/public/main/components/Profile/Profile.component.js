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

    componentDidMount = () => {
        this.props.getExchanges();
    }

    render() {
        const { isFetching, exchanges, user } = this.props;
        return (
            <div>
                {isFetching && (<CircularProgress />)}
                {!isFetching && (<ProfilePresentation user={user} exchanges={exchanges} />)}
            </div>
        );
    }
}

export default Profile;
