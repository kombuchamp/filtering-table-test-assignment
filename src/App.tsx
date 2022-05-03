import React, { FC } from 'react';

import { Grid, ThemeProvider } from '@mui/material';
import { TableFilters } from './components/TableFilters';

import { Header } from './components/Header';
import { Content } from './components/Content';
import { DARK_THEME, LIGHT_THEME } from './const/themes';
import { useTypedSelector } from './hooks/redux-helpers';

export const App: FC = () => {
    const { theme } = useTypedSelector((state) => state.themeReducer);

    return (
        <ThemeProvider theme={theme === 'light' ? LIGHT_THEME : DARK_THEME}>
            <Grid
                container
                flexDirection={'column'}
                rowGap={1}
                sx={{
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                }}
            >
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item container xs={12} justifyContent={'center'}>
                    <TableFilters />
                </Grid>
                <Grid item container xs={12} justifyContent={'center'}>
                    <Content />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
