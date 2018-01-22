const contentHeight = 100;
const contentPadding = 10;
const buttonsHeight = 50;
const buttonsPadding = 10;

const avatar = theme => ({
    marginLeft: 10,
    backgroundColor: theme.palette.primary[500],
    cursor: 'pointer',
    height: 40,
    width: 40,
    borderRadius: '50%',
});

export default theme => ({
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
    contentWrapper: {
        height: contentHeight - (2 * contentPadding),
        padding: contentPadding,
        display: 'flex',
        alignItems: 'center',
    },
    username: {
        marginLeft: 10,
    },
    buttons: {
        height: buttonsHeight - (2 * buttonsPadding),
        padding: buttonsPadding,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
    popover: {
        height: buttonsHeight + contentHeight,
    },
    signOutButton: {
        minHeight: 36,
        color: 'white',
        textTransform: 'initial',
    },
    avatar: avatar(theme),
    avatarPopover: {
        ...avatar(theme),
        cusrsor: 'default',
    },
});
