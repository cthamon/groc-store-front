import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormControl, InputLabel, Input, Button, Paper } from '@material-ui/core';

import { Layout } from '../components';
import useStyles from '../styles/material-ui/style';
import { useAddProduct } from '../services/query';
import AuthService from '../services/auth';

import { ProductCreType } from '../types';

const AddProduct = () => {
    AuthService();
    const router = useRouter();

    const { mutate, isSuccess, error } = useAddProduct();

    const [input, setInput] = useState<ProductCreType>({});
    const [file, setFile] = useState(null);

    const classes = useStyles();

    const handleInputChange = (e: { target: { id: string; value: string; }; }) => {
        const { id, value } = e.target;
        setInput(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { title, description, price, type } = input;
        const formData = new FormData();
        formData.append('title', title as any);
        formData.append('description', description as any);
        formData.append('price', price as any);
        formData.append('type', type as any);
        formData.append('productImg', file as any);
        mutate(formData);
    };

    let productImg;
    if (file) {
        productImg = URL.createObjectURL(file);
    }

    if (isSuccess) router.push("/admin");

    return (
        <Layout>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <Input
                                id="title"
                                type="title"
                                value={input.title}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input
                                multiline
                                id="description"
                                type="text"
                                value={input.description}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="price">Price</InputLabel>
                            <Input
                                id="price"
                                type="text"
                                value={input.price}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="type">Type</InputLabel>
                            <Input
                                id="type"
                                type="text"
                                value={input.type}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <div style={{ marginTop: '10px', display: 'flex' }}>
                            <input style={{ display: 'none' }} type="file" id="avatar" onChange={(e: any) => setFile(e.target.files[0])} />
                            <label style={{ padding: '0', width: '135px', height: '135px', margin: '0 auto' }} htmlFor="avatar">
                                <img style={{ width: '135px', height: '135px', border: '2px solid #ccc', padding: '3px', cursor: 'pointer' }}
                                    src={file ? productImg : "/product.png"} alt="product image" />
                            </label>
                        </div>
                        <Button type="submit" variant="contained" color="primary" className={classes.largeButton}>Add Product</Button>
                        <div style={{ width: '100%', textAlign: 'center', marginTop: '5px' }}>
                            {error &&
                                error.response.data.map((err: any, i: number) => (
                                    <p key={i} style={{ color: 'red', fontSize: '12px' }}>
                                        {err.message}
                                    </p>))
                            }
                        </div>
                    </form>
                </Paper>
            </main>
        </Layout>
    );
};

export default AddProduct;