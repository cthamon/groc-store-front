import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../types';

type CartItem = ProductType & { quantity: number; };

type CartState = CartItem[];

const initialState: CartState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const foundItem = state.find(
                (item) => item.id === action.payload.id
            );

            if (!foundItem) {
                state.push(action.payload);
            } else {
                return state.map((item) => ({
                    ...item,
                    quantity:
                        item.id === foundItem.id
                            ? item.quantity + 1
                            : item.quantity,
                }));
            }
        },
        increment: (state, action: PayloadAction<number>) =>
            state.map(item => ({
                ...item,
                quantity: item.id === action.payload ? item.quantity + 1 : item.quantity
            })),
        decrement: (state, action: PayloadAction<number>) =>
            state.map(item => ({
                ...item,
                quantity: item.quantity === 1 ? item.quantity :
                    item.id === action.payload ? item.quantity - 1 : item.quantity
            })),
        deleteCart: (state, action: PayloadAction<number>) =>
            state.filter((item) => item.id !== action.payload),
        clearCart: (state) =>
            state = [],
    },
});

export const { addToCart, increment, decrement, deleteCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
