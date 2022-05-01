import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    AppBar,
    Backdrop,
    Box,
    Chip,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import { Column, useTable } from 'react-table';
import { useTypedDispatch, useTypedSelector } from './hooks/redux-helpers';
import { setFilters } from './store/reducers/Filters';
import { PaymentMode, Status, TableEntry } from './types/TableDataTypes';
import { API } from './services/API';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import { PAYMENT_METHOD_RENDER_TEXTS } from './const/renderTexts';

function App() {
    return (
        <Grid container flexDirection={'column'} rowGap={1}>
            <Grid item xs={12}>
                <AppBar position={'static'}>
                    <Toolbar>
                        <GridOnIcon
                            sx={{
                                mr: 2,
                            }}
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Filtered table
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item container xs={12} justifyContent={'center'}>
                <Filters />
            </Grid>
            <Grid item container xs={12} justifyContent={'center'}>
                <Paper
                    elevation={3}
                    sx={{
                        flexGrow: 1,
                        margin: '0 20px',
                        padding: 2,
                    }}
                >
                    <Content />
                </Paper>
            </Grid>
        </Grid>
    );
}

function Content() {
    const { isLoading, isError, data } = API.useFetchTableDataQuery();

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
    if (isError) {
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
    return data ? <DataTable data={data} /> : null;
}

const DataTable: FC<{ data: TableEntry[] }> = ({ data: data }) => {
    // TODO: might be constant
    const columns: readonly Column<TableEntry>[] = useMemo(
        () =>
            [
                {
                    Header: 'Name',
                    accessor: 'name',
                },

                {
                    Header: 'Payment modes',
                    accessor: 'paymentModes',
                    // TODO: вынести в компонент
                    Cell: ({ cell }) => {
                        return (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                }}
                            >
                                {cell.value.map((value) => (
                                    <Chip
                                        size={'small'}
                                        key={value}
                                        label={
                                            PAYMENT_METHOD_RENDER_TEXTS[value]
                                        }
                                    />
                                ))}
                            </Box>
                        );
                    },
                },

                {
                    Header: 'Status',
                    accessor: 'status',
                },
            ] as const,
        []
    );

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        data,
        columns,
    });

    return (
        <Table stickyHeader {...getTableProps()}>
            <TableHead>
                {headerGroups.map((headerGroup) => (
                    // NOTE: react-table generates key on our behalf here
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <TableCell {...column.getHeaderProps()}>
                                <b>{column.render('Header')}</b>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <TableRow {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

function Filters() {
    const dispatch = useTypedDispatch();
    const { paymentModes, status, name } = useTypedSelector(
        (state) => state.filtersReducer
    );
    console.log({ paymentModes, status, name });

    return (
        <Paper
            elevation={3}
            sx={{
                flexGrow: 1,
                margin: '0 20px',
                padding: 2,
            }}
        >
            <Typography variant={'h5'} component={'h2'} mb={1}>
                Filters
            </Typography>
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    <TextField
                        id={'name-filter'}
                        label={'Name'}
                        variant={'outlined'}
                        size={'small'}
                        fullWidth
                        value={name}
                        onChange={(e) => {
                            dispatch(setFilters({ name: e.target.value }));
                        }}
                    />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <FormControl fullWidth size={'small'}>
                        <InputLabel id={'status-filter'}>Status</InputLabel>
                        <Select
                            label={'Status'}
                            labelId={'status-filter'}
                            value={status}
                            onChange={(e) => {
                                dispatch(
                                    setFilters({
                                        status: e.target.value as Status,
                                    })
                                );
                            }}
                        >
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={'NEW'}>NEW</MenuItem>
                            <MenuItem value={'LIVE'}>LIVE</MenuItem>
                            <MenuItem value={'OFFLINE'}>OFFLINE</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <FormControl fullWidth size={'small'}>
                        <InputLabel id={'payment-method-filter'}>
                            Payment method
                        </InputLabel>
                        <Select
                            label={'Payment method'}
                            labelId={'payment-method-filter'}
                            multiple
                            value={paymentModes}
                            onChange={(e) => {
                                dispatch(
                                    setFilters({
                                        paymentModes: e.target
                                            .value as PaymentMode[],
                                    })
                                );
                            }}
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip
                                            size={'small'}
                                            key={value}
                                            label={
                                                PAYMENT_METHOD_RENDER_TEXTS[
                                                    value
                                                ]
                                            }
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            <MenuItem value={'CREDIT_CARD'}>
                                {PAYMENT_METHOD_RENDER_TEXTS['CREDIT_CARD']}
                            </MenuItem>
                            <MenuItem value={'PAYPAL'}>
                                {PAYMENT_METHOD_RENDER_TEXTS['PAYPAL']}
                            </MenuItem>
                            <MenuItem value={'BANK_TRANSFER'}>
                                {PAYMENT_METHOD_RENDER_TEXTS['BANK_TRANSFER']}{' '}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default App;
