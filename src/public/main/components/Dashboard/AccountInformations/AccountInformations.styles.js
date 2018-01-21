export default () => ({
    symbolTable: {
        width: 150,
        margin: 25,
        height: 400,
        overflowY: 'auto',
    },
    paperWrapper: {
        margin: 25,
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
    asset: {
        color: 'rgba(0, 0, 0, 0.75)',
        margin: 10,
        padding: 10,
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        cursor: 'pointer',
        width: 200,
        transition: 'all 0.15s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    assetWrapper: {
        flexWrap: 'wrap',
        display: 'flex',
        padding: 10,
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
});
