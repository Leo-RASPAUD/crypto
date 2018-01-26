const buttonsHeight = 50;
const buttonsPadding = 10;
const contentHeight = 100;
const contentPadding = 10;

const avatar = theme => ({
    marginLeft: 10,
    backgroundColor: theme.palette.primary[500],
    cursor: 'pointer',
    height: 40,
    width: 40,
    borderRadius: '50%',
});

export default theme => ({
    username: {
        marginLeft: 10,
    },
    popover: {
        height: buttonsHeight + contentHeight,
    },
    buttons: {
        height: buttonsHeight - (2 * buttonsPadding),
        padding: buttonsPadding,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    avatar: avatar(theme),
    avatarPopover: {
        ...avatar(theme),
        cusrsor: 'default',
    },
    signOutButton: {
        minHeight: 36,
        color: 'white',
        textTransform: 'initial',
    },
    contentWrapper: {
        height: contentHeight - (2 * contentPadding),
        padding: contentPadding,
        display: 'flex',
        alignItems: 'center',
    },
});

