import { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import { useAppDispatch } from '../../store/store';
import { addToCart } from '../../store/slices/cartSlice';
import { ProductType } from '../../types';

const Product = ({ product }: { product: ProductType; }) => {
    const dispatch = useAppDispatch();

    const [fullDesc, setFullDesc] = useState(false);

    return (
        <Card style={styles.root}>
            <CardMedia style={styles.media} image={`https://ts-ecom-back.bossthamon.repl.co/static/images/products/${product.productImg}`} title={product.title} />
            <CardContent>
                <div style={styles.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.title}
                    </Typography>
                    <Typography variant="h5">
                        {"THB " + product.price}
                    </Typography>
                </div>
                <Typography variant="body2" color="textSecondary">
                    {
                        !fullDesc &&
                        <span>{product.description.slice(0, 75) + "... "}
                            <a
                                style={styles.readMore}
                                onClick={() => setFullDesc(!fullDesc)}
                            >
                                Read more
                            </a>
                        </span>
                    }
                    {
                        fullDesc &&
                        <span>{product.description}
                            <a
                                style={styles.readMore}
                                onClick={() => setFullDesc(!fullDesc)}
                            >
                                {` Show less`}
                            </a>
                        </span>
                    }
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={styles.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;

const styles = {
    root: {
        // maxWidth: 345, original width style
        maxWidth: '100%',
    },
    media: {
        height: 0,
        backgroundSize: 'auto',
        paddingTop: '56.25%', // 16:9
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    readMore: {
        cursor: 'pointer',
        color: '#37d',
    }
};