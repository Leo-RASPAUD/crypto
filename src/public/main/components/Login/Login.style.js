import loginHeader from 'assets/login.jpg';


export default {
    loginWrapper: {
        display: 'flex',
        justifyContent: 'center',
        margin: 50,
    },
    paperWrapper: {
        width: 500,
    },
    loginHeader: {
        background: `url(${loginHeader}) no-repeat center center`,
        backgroundSize: 'cover',
        flexDirection: 'column',
        alignItems: 'center',
        height: 75,
        position: 'relative',
    },
    paperForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
    },
};
