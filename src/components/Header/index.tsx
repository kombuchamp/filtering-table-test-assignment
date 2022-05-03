import React, { FC } from 'react';

import { AppBar, Box, Grid, Switch, Toolbar, Typography } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';

import { useTypedDispatch, useTypedSelector } from '../../hooks/redux-helpers';
import { setTheme } from '../../store/reducers/Theme';

/**
 * Application header
 *
 */
export const Header: FC = () => {
    const dispatch = useTypedDispatch();
    const { theme } = useTypedSelector((store) => store.themeReducer);

    return (
        <AppBar position={'static'}>
            <Toolbar>
                <GridOnIcon
                    sx={{
                        mr: 2,
                    }}
                />
                <Typography variant={'h6'} component={'h1'}>
                    Filtered table
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    <Grid container alignItems={'center'}>
                        <Typography>☀️</Typography>
                        <Switch
                            title={'toggles light and dark theme'}
                            color={'secondary'}
                            checked={theme !== 'light'}
                            onChange={(e) => {
                                const theme = e.target.checked
                                    ? 'dark'
                                    : 'light';
                                localStorage.setItem('theme', theme);
                                dispatch(setTheme(theme));
                            }}
                        />
                        <Typography>🌙</Typography>
                    </Grid>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
