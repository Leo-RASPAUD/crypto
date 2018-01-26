const trending = {
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
};

export default () => ({
    title: {
        fontSize: 18,
        borderBottom: '1px solid rgba(235, 235, 235, 1)',
        color: 'rgba(0, 0, 0, 0.54)',
        fontWeight: 500,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 25,
    },
    trendingUp: {
        ...trending,
        color: '#4caf50',
    },
    trendingDown: {
        ...trending,
        color: '#f44336',
    },
    trendingFlat: {
        ...trending,
        color: '#607d8b',
    },
    paperWrapper: {
        margin: 25,
    },
    assetWrapper: {
        flexWrap: 'wrap',
        display: 'flex',
        width: 750,
        padding: 10,
        height: 190,
        overflowY: 'auto',
    },
});
