import red from 'material-ui/colors/red';
import orange from 'material-ui/colors/orange';
import green from 'material-ui/colors/green';

export default () => ({
    error: {
        color: 'white',
        backgroundColor: red[500],
    },
    warn: {
        color: 'white',
        backgroundColor: orange[500],
    },
    success: {
        color: 'white',
        backgroundColor: green[500],
    },
});
