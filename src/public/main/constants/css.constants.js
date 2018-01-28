export default {
    smallButton: {
        padding: 2,
        minWidth: 25,
        width: 25,
        margin: 4,
        height: 25,
        minHeight: 26,
    },
    hoverTableBackground: theme => ({
        transition: 'background-color 0.25s ease-in-out',
        '&:hover': {
            backgroundColor: theme.palette.primary[50],
        },
    }),
    buttonBackgroundColor: {
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    overflow: {
        auto: {
            overflow: 'auto',
        },
        hidden: {
            overflow: 'hidden',
        },
    },
    textTransform: {
        initial: {
            textTransform: 'initial',
        },
    },
    cursor: {
        pointer: {
            cursor: 'pointer',
        },
        default: {
            cursor: 'default',
        },
    },
    position: {
        relative: {
            position: 'relative',
        },
        absolute: {
            position: 'absolute',
        },
    },
    display: {
        flex: {
            display: 'flex',
        },
        block: {
            display: 'block',
        },
    },
    flexWrap: {
        wrap: {
            flexWrap: 'wrap',
        },
    },
    flexDirection: {
        row: {
            flexDirection: 'row',
        },
        column: {
            flexDirection: 'column',
        },
    },
    alignItems: {
        stretch: {
            alignItems: 'stretch',
        },
        center: {
            alignItems: 'center',
        },
        flexStart: {
            alignItems: 'flex-start',
        },
        flexEnd: {
            alignItems: 'flex-end',
        },
        baseline: {
            alignItems: 'baseline',
        },
    },
    justifyContent: {
        baseline: {
            justifyContent: 'baseline',
        },
        center: {
            justifyContent: 'center',
        },
        flexStart: {
            justifyContent: 'flex-start',
        },
        flexEnd: {
            justifyContent: 'flex-end',
        },
        spaceBetween: {
            justifyContent: 'space-between',
        },
        spaceAround: {
            justifyContent: 'space-around',
        },
        spaceEvenly: {
            justifyContent: 'space-evenly',
        },
    },
    textAlign: {
        center: {
            textAlign: 'center',
        },
        left: {
            textAlign: 'left',
        },
        right: {
            textAlign: 'right',
        },
        justify: {
            textAlign: 'justify',
        },
    },
};
