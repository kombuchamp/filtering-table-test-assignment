import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'dark' | 'light';

const initialState = {
    theme: 'light',
};

export const themeSlice = createSlice({
    name: 'Theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
