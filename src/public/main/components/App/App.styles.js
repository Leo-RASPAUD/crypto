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
