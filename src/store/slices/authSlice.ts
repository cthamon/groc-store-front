import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from '../../types';

type AuthState = {
    user: UserType | null;
};

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload;
        },
        signout: (state) => {
            state.user = null;
        },
    },
});

export const { signout, setUser } = authSlice.actions;

export default authSlice.reducer;
