import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import classnames from 'classnames';
import Icon from 'material-ui/Icon';
import ExchangePresentation from '../../ExchangePresentation.utils';
import styles from './SymbolPresentation.styles';

// onClick={() => displayPrices({
//     exchangeName,
//     symbol: symbol.asset === 'ETH' ? `${symbol.asset}USDT` : `${symbol.asset}ETH`,
// })}

@withStyles(styles)
class SymbolPresentation extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        symbol: PropTypes.object.isRequired,
        exchangeName: PropTypes.string.isRequired,
        displaySymbolPrices: PropTypes.func.isRequired,
    };

    render() {
        const { classes, symbol, exchangeName, displaySymbolPrices } = this.props;
        console.log(displaySymbolPrices);
        console.log(exchangeName);
        const { cssClass, icon } = ExchangePresentation.getCssTrends({
            previousPrice: symbol.trend.previousPrice,
            currentPrice: symbol.trend.currentPrice,
        });
        symbol.cssClass = cssClass;
        symbol.icon = icon;
        return (
            <Paper className={classes.asset}>
                <div className={classes.iconWrapper}>
                    <div style={{ position: 'relative' }}>
                        <div className={classnames(`crypto-${symbol.asset.toLowerCase()}`, classes.icon)}>
                            <span className="path1" />
                            <span className="path2" />
                            <span className="path3" />
                            <span className="path4" />
                            <span className="path5" />
                            <span className="path6" />
                            <span className="path7" />
                        </div>
                        <Icon color="primary" className={classes.noIcon}>
                            monetization_on
                        </Icon>
                    </div>
                    <div>
                        {symbol.asset} ({Number.parseFloat(symbol.free + symbol.locked).toFixed(4)})
                    </div>
                </div>
                <div className={classes.iconWrapper} >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {symbol.isLoading && <CircularProgress color="primary" size={24} />}
                        {symbol.isLoading && <CircularProgress color="primary" size={24} />}
                    </div>
                    {!symbol.isLoading && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Icon style={{ marginRight: 5 }} className={classes[symbol.cssClass]}>
                                    {symbol.icon}
                                </Icon>
                                <div>
                                    ${symbol.trend.currentPrice.toFixed(6)}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Icon color="primary" style={{ marginRight: 5 }}>
                                    credit_card
                                </Icon>
                                <div>
                                    ${symbol.trend.currentPriceUsdt.toFixed(4)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Paper>

        );
    }
}

export default SymbolPresentation;
