import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, Typography } from '@material-ui/core';

import { Layout } from '../components';
import AuthService from '../services/auth';
import axios from '../services/axios';

import useStyles from '../styles/material-ui/style';
import { ProductCreType } from '../types';

const Admin = () => {
    AuthService();
    const router = useRouter();
    const [products, setProducts] = useState<ProductCreType[]>([]);

    const classes = useStyles();

    const fetchProducts = async () => {
        const { data } = await axios.get(`/api/product`);
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Layout>
            <main className={classes.layout} style={{ width: "1200px" }}>
                <div className={classes.cartHeader}>
                    <Typography></Typography>
                    <Button variant="contained" color="primary" onClick={() => router.push(`/addproduct`)}>Add Item</Button>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Price&nbsp;(THB)</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.map((product: any) => (
                                <TableRow
                                    key={product.id}
                                >
                                    <TableCell component="th" scope="row">{product.id}</TableCell>
                                    <TableCell component="th" scope="row"><img
                                        src={`https://ts-ecom-back.bossthamon.repl.co/static/images/products/${product.productImg}`}
                                        width="75px"
                                    /></TableCell>
                                    <TableCell>{product.type}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell align="right">{product.price}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => router.push(`/editproduct/${product.id}`)}>Edit</Button>
                                        <Button onClick={async () => {
                                            await axios.delete(`/api/product/${product.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
                                            fetchProducts();
                                        }}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>
        </Layout>
    );
};

export default Admin;