import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    layout: {
        marginTop: '5%',
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginTop: 60,
        },
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    cartHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0'
    },
    button: {
        border: 'none',
        borderRadius: '20%',
        width: '20px',
        "&:hover": {
            backgroundColor: "#ccc"
        }
    },
    largeButton: {
        marginTop: '20px',
        width: '100%'
    },
    delButton: {
        border: 'none',
        borderRadius: '10%',
        background: 'none',
        fontSize: '10px',
        color: "#f00",
        marginLeft: '3px',
        "&:hover": {
            color: "#c00",
        }
    },
    listItem: {
        padding: '10px 0'
    },
    additem: {
        cursor: 'pointer'
    },
    image: {
        marginRight: '20px',
        width: '75px'
    },
    quantity: {
        padding: '0 3px',
        cursor: 'default',
    },
    bottom: {
        padding: '0 0 10px 0'
    },
    formControl: {
        width: '100%',
    }
}));