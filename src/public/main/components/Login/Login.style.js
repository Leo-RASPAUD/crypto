import loginHeader from 'assets/login.jpg';
import loginBackground from 'assets/login_background.jpg';


export default {
    loginWrapper: {
        display: 'flex',
        justifyContent: 'center',
        background: `url(${loginBackground}) no-repeat center center`,
        backgroundSize: 'cover',
        height: '100%',
    },
    paperWrapper: {
        width: 500,
        height: 400,
        margin: 150,
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
