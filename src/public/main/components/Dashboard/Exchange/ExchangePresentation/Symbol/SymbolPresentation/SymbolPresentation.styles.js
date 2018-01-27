const trending = {
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
};

export default () => ({
    paperWrapper: {
        margin: 25,
    },
    asset: {
        color: 'rgba(0, 0, 0, 0.75)',
        margin: 10,
        padding: 10,
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        cursor: 'pointer',
        width: 200,
        height: 65,
        transition: 'all 0.15s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    noIcon: {
        zIndex: 1,
        fontSize: 24,
        marginRight: 5,
    },
    icon: {
        fontSize: 23,
        position: 'absolute',
        zIndex: 2,
        marginRight: 5,
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
