import React from 'react';
import PropTypes from 'prop-types';

import ExchangePresentation from './ExchangePresentation/ExchangePresentation.component';

class Exchange extends React.Component {
    static propTypes = {
        exchange: PropTypes.object.isRequired,
        getExchangeInformations: PropTypes.func.isRequired,
    };

    componentDidMount = () => {
        const { getExchangeInformations, exchange } = this.props;
        getExchangeInformations({ exchange });
    }

    render() {
        const { exchange } = this.props;
        return <ExchangePresentation exchange={exchange} isLoading={exchange.isLoading} />;
    }
}

export default Exchange;
