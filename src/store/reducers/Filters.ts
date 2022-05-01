import { TableEntry } from '../../types/TableDataTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Filters = {
    name: TableEntry['name'];
    status: TableEntry['status'] | '';
    paymentModes: TableEntry['paymentModes'];
};

const initialState: Filters = {
    name: '',
    status: '',
    paymentModes: [],
};

export const filtersSlice = createSlice({
    name: 'Filters',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<Partial<Filters>>) {
            Object.assign(state, action.payload);
        },
    },
});

export const { setFilters } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
