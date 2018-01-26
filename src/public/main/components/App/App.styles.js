export default theme => ({
    loadingBar: {
        position: 'absolute',
        height: 2,
        backgroundColor: theme.palette.secondary[500],
        opacity: '0.75 !important',
    },
    toolbarItems: {
        display: 'flex',
        alignItems: 'center',
    },
    toolbarItem: {
        color: theme.palette.primary['500'],
        cursor: 'pointer',
        marginRight: 20,
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
            color: '#3f51b5',
        },
    },
    appBar: {
        backgroundColor: 'white !important',
        color: 'white',
        borderColor: 'rgb(43, 54, 65)',
        height: 64,
    },
});
