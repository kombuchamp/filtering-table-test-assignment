import React, { FC } from 'react';
import { AppBar, Box, Grid, Switch, Toolbar, Typography } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useTypedDispatch } from '../../hooks/redux-helpers';
import { setTheme } from '../../store/reducers/Theme';

/**
 * Application header
 *
 */
export const Header: FC = () => {
    const dispatch = useTypedDispatch();

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
                            onChange={(e) => {
                                dispatch(
                                    setTheme(
                                        e.target.checked ? 'dark' : 'light'
                                    )
                                );
                            }}
                        />
                        <Typography>🌙</Typography>
                    </Grid>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
