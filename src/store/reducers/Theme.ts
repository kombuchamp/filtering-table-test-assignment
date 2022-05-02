import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseTheme } from './parseTheme';

export type Theme = 'dark' | 'light';

const persistedTheme = localStorage.getItem('theme');

const initialState = {
    theme: parseTheme(persistedTheme) ?? 'light',
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
