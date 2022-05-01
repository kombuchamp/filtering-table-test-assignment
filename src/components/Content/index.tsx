import React, { FC } from 'react';
import { API } from '../../services/API';
import { useDebounced } from '../../hooks/useDebounced';
import { useTypedSelector } from '../../hooks/redux-helpers';
import {
    Backdrop,
    CircularProgress,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import { DataTable } from '../DataTable';

/**
 * Main content of the app
 *
 */
export const Content: FC = () => {
    // NOTE: RTK Query caches requests internally. Object "data" has persistent reference
    const { isLoading, isError, data } = API.useFetchTableDataQuery();

    // Debounce filters to avoid running filtering over data too often
    const filters = useDebounced(
        useTypedSelector((state) => state.filtersReducer),
        500
    );

    if (isLoading) {
        return (
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open
            >
                <CircularProgress color={'inherit'} />
            </Backdrop>
        );
    }
    if (isError || data === undefined) {
        return (
            <Grid container direction={'column'} alignItems={'center'}>
                <Grid item>
                    <Typography variant={'h4'} component={'h2'} color={'error'}>
                        Network error
                    </Typography>
                </Grid>
                <Grid item>
                    <SignalWifiStatusbarConnectedNoInternet4Icon
                        fontSize={'large'}
                        color={'error'}
                    />
                </Grid>
            </Grid>
        );
    }
    return (
        <Paper
            elevation={3}
            sx={{
                flexGrow: 1,
                mx: 1,
                padding: 2,
            }}
        >
            <DataTable data={data} filters={filters} />
        </Paper>
    );
};
