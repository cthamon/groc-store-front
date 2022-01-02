import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, List, ListItem, ListItemText, Paper, Button, StepConnector } from '@material-ui/core';

import { Layout } from '../components';
import AuthService from '../services/auth';
import { useAppDispatch, useAppSelector } from '../store/store';
import { increment, decrement, deleteCart, clearCart } from '../store/slices/cartSlice';
import useStyles from '../styles/material-ui/style';

const Cart = () => {
    AuthService();
    const classes = useStyles();
    const cart = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (cart.length === 0) {
            router.push("/");
        }
    }, [cart]);

    return (
        <Layout>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <div className={classes.cartHeader}>
                        <Typography variant="h6">Cart</Typography>
                        <Typography
                            variant="body2"
                            color="primary"
                            className={classes.additem}
                            onClick={() => router.push("/")}
                        >
                            Add Item +
                        </Typography>
                    </div>
                    <List disablePadding>
                        {cart.map((product) => (
                            <ListItem className={classes.listItem} key={product.id}>
                                <img
                                    src={`https://ts-ecom-back.bossthamon.repl.co/static/images/products/${product.productImg}`}
                                    className={classes.image}
                                />
                                <ListItemText
                                    primary={product.title}
                                    secondary={
                                        <div>
                                            <button className={classes.button} onClick={() => dispatch(decrement(product.id))}>-</button>
                                            <span className={classes.quantity}>{product.quantity}</span>
                                            <button className={classes.button} onClick={() => dispatch(increment(product.id))}>+</button>
                                            <button className={classes.delButton} onClick={() => dispatch(deleteCart(product.id))}>Remove</button>
                                        </div>
                                    } />
                                <Typography variant="body2">{`THB ${+product.price * product.quantity}`}</Typography>
                            </ListItem>
                        ))}
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Total" />
                            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                                {`THB ${cart.reduce((sum, item) => sum + (item.quantity * +item.price), 0)}`}
                            </Typography>
                        </ListItem>
                        <StepConnector className={classes.bottom} />
                        <ListItem className={classes.cartHeader}>
                            <Button variant="contained" onClick={() => dispatch(clearCart())}>Cancel</Button>
                            <Button variant="contained" color="primary" onClick={() => router.push("/proceed")}>Proceed</Button>
                        </ListItem>
                    </List>
                </Paper>
            </main>
        </Layout>
    );
};

export default Cart;