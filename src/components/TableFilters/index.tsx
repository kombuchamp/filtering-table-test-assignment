import React, { FC } from 'react';

import { useTypedDispatch, useTypedSelector } from '../../hooks/redux-helpers';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';

import { setFilters } from '../../store/reducers/Filters';
import { PaymentMode, Status } from '../../types/TableDataTypes';
import { PAYMENT_MODE_RENDER_TEXTS } from '../../const/renderTexts';
import { BreadCrumbs } from '../BreadCrumbs';

const PAYMENT_MODES_FILTERS: PaymentMode[] = [
    'PAYPAL',
    'BANK_TRANSFER',
    'CREDIT_CARD',
];

const STATUS_FILTERS: (Status | '')[] = ['', 'NEW', 'LIVE', 'OFFLINE'];

/**
 * Contains inputs for setting filter values
 *
 */
export const TableFilters: FC = () => {
    const dispatch = useTypedDispatch();
    const { paymentModes, status, name } = useTypedSelector(
        (state) => state.filtersReducer
    );

    return (
        <Paper
            elevation={3}
            sx={{
                flexGrow: 1,
                mx: 1,
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
                                <BreadCrumbs
                                    values={selected.map(
                                        (value) =>
                                            PAYMENT_MODE_RENDER_TEXTS[value]
                                    )}
                                />
                            )}
                        >
                            {PAYMENT_MODES_FILTERS.map((mode) => {
                                return (
                                    <MenuItem value={mode} key={mode}>
                                        {PAYMENT_MODE_RENDER_TEXTS[mode]}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
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
                            {STATUS_FILTERS.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status || 'None'}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
};
