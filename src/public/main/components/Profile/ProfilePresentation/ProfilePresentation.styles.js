import cssConstants from 'constants/css.constants.js';

const styles = theme => ({
    removeIcon: {
        color: '#f44336',
        ...cssConstants.cursor.pointer,
    },
    root: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
        ...cssConstants.alignItems.center,
        marginTop: 25,
    },
    profileTitle: {
        fontSize: 24,
        color: theme.palette.primary['500'],
    },
    personalInformations: {
        width: 300,
        height: 150,
        padding: 15,
        margin: '25px 50px',
    },
    exchangeWrapper: {
        width: 300,
        padding: 15,
        margin: '25px 50px',
    },
    subtitle: {
        borderBottom: '1px solid rgba(0,0,0,0.25)',
        padding: 15,
        opacity: 0.75,
    },
    item: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        padding: 15,
    },
    icon: {
        marginRight: 10,
        opacity: 0.75,
    },
    addNewExchange: {
        transition: 'all 0.25s ease-in-out',
        width: '100%',
        ...cssConstants.justifyContent.baseline,
        '&:hover:not([disabled])': {
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
        },
    },
});

export default styles;
