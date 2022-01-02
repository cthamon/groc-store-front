import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface filterType {
    searchValue: string;
    filterValue: string[];
    sortValue: string;
}

const initialState: filterType = {
    searchValue: "",
    filterValue: [],
    sortValue: "none"
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) =>
            ({ ...state, searchValue: action.payload }),
        setFilterValue: (state, action: PayloadAction<string>) => {
            const foundItem = state.filterValue.find(
                (item) => item === action.payload
            );

            if (!foundItem) {
                state.filterValue.push(action.payload);
            } else {
                return ({
                    ...state, filterValue: state.filterValue.filter(
                        (item) => item !== action.payload
                    )
                });
            }
        },
        setSortValue: (state, action: PayloadAction<string>) =>
            ({ ...state, sortValue: action.payload })
        ,
    }
});

export const { setSearchValue, setFilterValue, setSortValue } = filterSlice.actions;

export default filterSlice.reducer;