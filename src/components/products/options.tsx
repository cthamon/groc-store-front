import { useState } from 'react';
import { Button, Popover, List, ListItem, ListItemText, Checkbox, ListItemIcon } from '@material-ui/core';

import useStyle from './styles';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setFilterValue, setSortValue } from '../../store/slices/filterSlice';

import { ProductType } from '../../types';

const Options = ({ products }: { products: ProductType[]; }) => {
    const { sortValue, filterValue } = useAppSelector(state => state.filter);
    const dispatch = useAppDispatch();
    const classes = useStyle();
    const productTypes = [...Array.from(new Set(products.map((item: ProductType) => item.type)))];

    const [anchorFilter, setAnchorFilter] = useState<HTMLButtonElement | null>(null);
    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorFilter(event.currentTarget);
    };
    const handleFilterClose = () => {
        setAnchorFilter(null);
    };
    const openFilter = Boolean(anchorFilter);
    const filter = openFilter ? 'filter' : undefined;

    const [anchorSort, setAnchorSort] = useState<HTMLButtonElement | null>(null);
    const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorSort(event.currentTarget);
    };
    const handleSortClose = () => {
        setAnchorSort(null);
    };
    const openSort = Boolean(anchorSort);
    const sort = openSort ? 'sort' : undefined;

    return (
        <div className={classes.filterOption}>
            <Button aria-describedby={filter} variant="contained" onClick={handleFilterClick} className={classes.button}>
                Filter Option
            </Button>
            <Popover
                id={filter}
                open={openFilter}
                anchorEl={anchorFilter}
                onClose={handleFilterClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List>
                    {productTypes.map((item, i) => (
                        <ListItem key={i} className={classes.listItem}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    color="primary"
                                    checked={filterValue.includes(item)}
                                    onChange={() => dispatch(setFilterValue(item))}
                                />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            </Popover>

            <Button className={classes.button} onClick={handleSortClick}>
                Sort by | {sortValue === "Price: high to low" ? "Price: high to low" : sortValue === "Price: low to high" ? "Price: low to high" : "none"}
            </Button>
            <Popover
                id={sort}
                open={openSort}
                anchorEl={anchorSort}
                onClose={handleSortClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List>
                    <ListItem className={classes.listItem} style={{ cursor: 'pointer' }} onClick={() => dispatch(setSortValue("Price: high to low"))}>
                        <ListItemText primary="Price: high to low" />
                    </ListItem>
                    <ListItem className={classes.listItem} style={{ cursor: 'pointer' }} onClick={() => dispatch(setSortValue("Price: low to high"))}>
                        <ListItemText primary="Price: low to high" />
                    </ListItem>
                </List>
            </Popover>
        </div>
    );
};

export default Options;