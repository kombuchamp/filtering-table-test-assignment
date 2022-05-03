import React, { FC, memo } from 'react';
import { Column, useTable } from 'react-table';

import { TableEntry } from '../../types/TableDataTypes';
import { Filters } from '../../store/reducers/Filters';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { PAYMENT_METHOD_RENDER_TEXTS } from '../../const/renderTexts';
import { BreadCrumbs } from '../BreadCrumbs';
import { applyFilters } from '../../utils/applyFilters';

const COLUMNS: readonly Column<TableEntry>[] = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Payment modes',
        accessor: 'paymentModes',
        Cell: ({ cell }) => {
            return (
                <BreadCrumbs
                    values={cell.value.map(
                        (code) => PAYMENT_METHOD_RENDER_TEXTS[code]
                    )}
                />
            );
        },
    },

    {
        Header: 'Status',
        accessor: 'status',
    },
] as const;

/**
 * Data grid with data
 *
 * NOTE: Component is memoized to avoid rendering everytime filter values change
 * It is viable because rendering of large list (like one we are rendering without filters) takes
 * significant amount of time.
 *
 * More optimal solution could be:
 * - Filtering on backend and rendering with pagination
 * - Using virtualized list
 */
export const DataTable: FC<{ data: TableEntry[]; filters: Filters }> = memo(
    ({ data, filters }) => {
        const { getTableProps, headerGroups, rows, prepareRow } = useTable({
            data: applyFilters(data, filters),
            columns: COLUMNS,
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
    }
);
