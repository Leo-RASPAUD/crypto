import React from 'react';
import PropTypes from 'prop-types';
import SymbolPresentation from './SymbolPresentation/SymbolPresentation.component';

class Symbol extends React.Component {
    static propTypes = {
        symbol: PropTypes.object.isRequired,
        exchangeName: PropTypes.string.isRequired,
        getTrend: PropTypes.func.isRequired,
        getPrices: PropTypes.func.isRequired,
    };

    componentDidMount = async () => {
        this.refreshValues();
        this.interval = setInterval(this.refreshValues, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    refreshValues = async () => {
        const { symbol, getTrend } = this.props;
        getTrend({ exchangeName: this.props.exchangeName, symbol });
    }

    render() {
        const { symbol, exchangeName, getPrices } = this.props;
        return <SymbolPresentation symbol={symbol} exchangeName={exchangeName} getPrices={getPrices} />;
    }
}

export default Symbol;
