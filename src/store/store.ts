import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import filterReducer from './slices/filterSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        filter: filterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;