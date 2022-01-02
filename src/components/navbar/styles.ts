import { makeStyles, alpha } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({
    appBar: {
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    title: {
        flexGrow: 1,
        alignItems: 'center',
        display: 'flex',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    image: {
        marginRight: '10px',
    },
    grow: {
        flexGrow: 1,
    },
    signIn: {
        marginLeft: '5px',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '20%',
        '&:hover': {
            backgroundColor: '#f5f5f5'
        }
    }
}));