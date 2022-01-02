import { AppBar, Toolbar, IconButton, Badge, Typography, TextField } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { setSearchValue } from '../../store/slices/filterSlice';
import { signout } from '../../store/slices/authSlice';
import useStyles from './styles';

const Navbar = () => {
    const dispatch = useAppDispatch();
    const { auth, cart } = useAppSelector(state => state);
    const router = useRouter();
    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit" onClick={() => router.push("/")}>
                        <img
                            src={"https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon_res_download_collect.png"}
                            alt="GROC"
                            height="25px"
                            className={classes.image}
                        />
                        GROC
                    </Typography>
                    <TextField label="Search" variant="outlined" size="small" onChange={(e) => dispatch(setSearchValue(e.target.value))} />
                    <div className={classes.grow} />
                    <div>
                        <IconButton aria-label="Show cart items" color="inherit" onClick={() => router.push("/cart")}>
                            <Badge badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                    {auth.user?.email === "c.tm@gmail.com" ? <Typography className={classes.signIn} onClick={() => router.push("/admin")}>
                        Manage
                    </Typography> : ""}
                    {auth.user ? <>
                        <Typography className={classes.signIn} onClick={() => { router.push("/profile"); }}>
                            Profile
                        </Typography>
                        <Typography className={classes.signIn} onClick={() => { dispatch(signout()); localStorage.clear(); router.push("/"); }}>
                            Sign out
                        </Typography>
                    </> : <Typography className={classes.signIn} onClick={() => { if (router.pathname === "/signin") router.push("/signup"); else router.push("/signin"); }}>
                        {router.pathname === "/signin" ? "Sign up" : "Sign in"}
                    </Typography>
                    }
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;