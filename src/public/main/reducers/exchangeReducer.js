/* eslint-disable indent */
import loginActions from 'components/Login/Login.actions';
import appActions from 'components/App/App.actions';
import exchangeActions from 'components/Dashboard/Exchange/Exchange.actions';
import profileActions from 'components/Profile/Profile.actions';
import symbolActions from 'components/Dashboard/Exchange/ExchangePresentation/Symbol/Symbol.actions';

const filterLowCountItems = threshold => balance => balance.free > threshold || balance.locked > threshold;

const addTotals = item => ({
    ...item,
    total: item.data.balances.filter(filterLowCountItems(item.threshold)).reduce((a, b) => a + b.trend.currentPriceUsdt, 0),
});

const getPriceInUsdt = ({ value, action, asset, free, locked }) => {
    const multiplier = asset === 'ETH' || asset === 'USDT' || asset === 'BTC' ? 1 : action.ethLastPrice;
    const valueMultiplier = asset === 'USDT' ? 1 : value;
    return valueMultiplier * multiplier * Number.parseFloat(Number.parseFloat(free) + Number.parseFloat(locked));
};

const generateTrends = ({ action, balance }) => ({
    ...balance,
    isLoading: false,
    trend: {
        previousPrice: action.trend.previousPrice.value,
        previousPriceUsdt: getPriceInUsdt({
            value: action.trend.previousPrice.value,
            action,
            asset: balance.asset,
            free: balance.free,
            locked: balance.locked,
        }),
        currentPrice: action.trend.currentPrice.value,
        currentPriceUsdt: getPriceInUsdt({
            value: action.trend.currentPrice.value,
            action,
            asset: balance.asset,
            free: balance.free,
            locked: balance.locked,
        }),
    },
});

const exchangeReducer = (
    state = {
        exchanges: [],
    },
    action,
) => {
    switch (action.type) {
        case loginActions.states.CRYPTO_CREATE_USER_SUCCESS:
        case loginActions.states.CRYPTO_REQUEST_LOGIN_SUCCESS:
        case appActions.states.CRYPTO_REQUEST_CHECK_CREDENTIALS_SUCCESS:
            return {
                ...state,
                exchanges: action.user.exchanges.map(exchange => ({ ...exchange, isLoading: true, isError: false, data: {} })) || [],
            };
        case exchangeActions.states.CRYPTO_GET_EXCHANGE_INFORMATIONS_FAILURE:
            return {
                ...state,
                exchanges:
                    state.exchanges.map(exchange => ({
                        ...exchange,
                        total: 0,
                        isError: exchange.name === action.exchange.name ? true : exchange.isError,
                        isLoading: exchange.name === action.exchange.name ? false : exchange.isLoading,
                    })) || [],
            };
        case exchangeActions.states.CRYPTO_GET_EXCHANGE_INFORMATIONS_SUCCESS:
            return {
                ...state,
                exchanges:
                    state.exchanges.map(
                        exchange =>
                            exchange.name !== action.exchange.name
                                ? exchange
                                : {
                                      ...exchange,
                                      threshold: 0.001,
                                      isLoading: false,
                                      data: {
                                          ...action.exchange.data,
                                          balances: action.exchange.data.balances.map(balance => ({
                                              ...balance,
                                              isLoading: true,
                                              isError: false,
                                              trend: {},
                                          })),
                                      },
                                  },
                    ) || [],
            };
        case symbolActions.states.CRYPTO_GET_TREND_FAILURE:
            return {
                ...state,
                exchanges: state.exchanges.map(
                    exchange =>
                        exchange.name !== action.exchangeName
                            ? exchange
                            : {
                                  ...exchange,
                                  data: {
                                      ...exchange.data,
                                      balances: exchange.data.balances.map(
                                          balance =>
                                              balance.asset !== action.symbolBaseName
                                                  ? balance
                                                  : {
                                                        ...balance,
                                                        isError: true,
                                                        isLoading: false,
                                                    },
                                      ),
                                  },
                              },
                ),
            };
        case symbolActions.states.CRYPTO_GET_TREND_LOADING:
            return {
                ...state,
                exchanges: state.exchanges.map(
                    exchange =>
                        exchange.name !== action.exchangeName
                            ? exchange
                            : {
                                  ...exchange,
                                  data: {
                                      ...exchange.data,
                                      balances: exchange.data.balances.map(
                                          balance =>
                                              balance.asset !== action.symbolBaseName
                                                  ? balance
                                                  : {
                                                        ...balance,
                                                        isLoading: true,
                                                    },
                                      ),
                                  },
                              },
                ),
            };

        case profileActions.states.CRYPTO_ADD_EXCHANGE_SUCCESS:
            return {
                ...state,
                exchanges: state.exchanges.concat({
                    ...action.exchange,
                    threshold: 0.001,
                    isLoading: true,
                    data: {},
                }),
            };
        case profileActions.states.CRYPTO_REMOVE_EXCHANGE_SUCCESS:
            return {
                ...state,
                exchanges: state.exchanges.filter(exchange => exchange.name !== action.exchangeName),
            };

        case symbolActions.states.CRYPTO_GET_TREND_SUCCESS: {
            let newExchanges = state.exchanges.map(
                exchange =>
                    exchange.name !== action.exchangeName
                        ? exchange
                        : {
                              ...exchange,
                              data: {
                                  ...exchange.data,
                                  balances: exchange.data.balances.map(
                                      balance => (balance.asset !== action.symbolBaseName ? balance : generateTrends({ action, balance })),
                                  ),
                              },
                          },
            );
            newExchanges = newExchanges.map(item => (item.name !== action.exchangeName ? item : addTotals(item)));

            return {
                ...state,
                exchanges: newExchanges,
            };
        }
        default:
            return state;
    }
};

export default exchangeReducer;
