import { Grid } from '@material-ui/core';

import Product from './product';
import Options from './options';
import useStyle from './styles';
import { useAppSelector } from '../../store/store';

import { ProductType } from '../../types';
import { useEffect, useState } from 'react';

const Products = ({ products }: { products: ProductType[]; }) => {
    const { searchValue, filterValue, sortValue } = useAppSelector(state => state.filter);
    const [productFilter, setProductFilter] = useState(products);
    const classes = useStyle();

    useEffect(() => {
        if (filterValue.length === 0) setProductFilter(products);
        if (filterValue.length === 0 && sortValue === "Price: low to high") setProductFilter(products.sort((a, b) => +a.price - +b.price));
        if (filterValue.length === 0 && sortValue === "Price: high to low") setProductFilter(products.sort((a, b) => +b.price - +a.price));
        if (filterValue.length !== 0) setProductFilter(products.filter((product: ProductType) => filterValue.includes(product.type)));
        if (filterValue.length !== 0) setProductFilter(products.filter((product: ProductType) => filterValue.includes(product.type)));
        if (filterValue.length !== 0 && sortValue === "Price: low to high") setProductFilter(products.filter((product: ProductType) => filterValue.includes(product.type)).sort((a, b) => +a.price - +b.price));
        if (filterValue.length !== 0 && sortValue === "Price: high to low") setProductFilter(products.filter((product: ProductType) => filterValue.includes(product.type)).sort((a, b) => +b.price - +a.price));
        if (searchValue) setProductFilter(products.filter((product: ProductType) => product.title.toLowerCase().includes(searchValue.toLowerCase())));
    }, [searchValue, filterValue, sortValue]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Options products={products} />
            <Grid container justifyContent="center" spacing={4}>
                {productFilter.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
};

export default Products;
