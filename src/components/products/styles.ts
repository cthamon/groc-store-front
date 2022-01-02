import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    root: {
        flexGrow: 1,
    },
    filterOption: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    filterList: {
        padding: '10px'
    },
    button: {
        textTransform: 'none'
    },
    listItem: {
        padding: '0 20px',
        cursor: 'default',
    }
}));