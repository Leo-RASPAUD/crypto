const styles = theme => ({
    table: {
    },
    exchanges: {
        display: 'flex',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    exchange: {
        margin: 25,
    },
    balanceItem: {
        backgroundColor: '#03A9F4',
        borderRadius: 5,
        padding: 5,
        margin: 5,
        cursor: 'pointer',
    },
    symbolTables: {
        display: 'flex',
    },
    exchangesWrapper: {
        display: 'flex',
    },
    noDataWrapper: {
        display: 'flex',
        justifyContent: 'center',
        margin: 50,
    },
    noData: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'justify',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 400,
        padding: 25,
        color: theme.palette.primary['500'],
        opacity: 0.75,
        fontSize: 18,
    },
});

export default styles;
