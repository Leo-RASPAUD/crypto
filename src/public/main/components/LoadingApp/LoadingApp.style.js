export default () => ({
    loadingWrapper: {
        display: 'flex',
        justifyContent: 'center',
        margin: 50,
    },
    paperWrapper: {
        width: 500,
        minHeight: 400,
    },
    paperForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
    },
    loadingItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        margin: 15,
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    },
    loadingLabel: {
        minWidth: 125,
        textAlign: 'right',
    },
});
