const trending = {
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
};

export default () => ({
    paperWrapper: {
        margin: 25,
        width: 750,
        padding: 10,
    },
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
    content: {
        padding: '10px 50px 50px 50px',
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
});
