import React from 'react';
import PropTypes from 'prop-types';
import SymbolPresentation from './SymbolPresentation/SymbolPresentation.component';

class Symbol extends React.Component {
    static propTypes = {
        symbol: PropTypes.object.isRequired,
        exchangeName: PropTypes.string.isRequired,
        getTrend: PropTypes.func.isRequired,
        displaySymbolPrices: PropTypes.func.isRequired,
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
        let symbolToSearch = 'ETHUSDT';
        if (symbol.asset !== 'ETH') {
            symbolToSearch = `${symbol.asset}ETH`;
        }
        getTrend({ exchangeName: this.props.exchangeName, symbol: symbolToSearch, symbolBaseName: symbol.asset });
    }

    render() {
        const { symbol, exchangeName, displaySymbolPrices } = this.props;
        return <SymbolPresentation symbol={symbol} exchangeName={exchangeName} displaySymbolPrices={displaySymbolPrices} />;
    }
}

export default Symbol;
