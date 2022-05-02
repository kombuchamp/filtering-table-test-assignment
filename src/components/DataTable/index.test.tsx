import { render, screen } from '@testing-library/react';
import { DataTable } from './index';
import React from 'react';
import { TableEntry } from '../../types/TableDataTypes';

const TEST_DATA: TableEntry[] = [
    {
        id: 'e8aa7f39-b88a-4b05-b8bb-31d5bed61158',
        name: 'Foo',
        status: 'LIVE',
        paymentModes: ['BANK_TRANSFER'],
    },
    {
        id: '87a7b3d8-db61-4286-95b3-af202b1a3c24',
        name: 'Foo',
        status: 'LIVE',
        paymentModes: ['CREDIT_CARD', 'BANK_TRANSFER', 'PAYPAL'],
    },
    {
        id: 'e016bac6-cd54-4c5f-8814-8e941cd25417',
        name: 'Foo',
        status: 'NEW',
        paymentModes: ['CREDIT_CARD'],
    },
    {
        id: '5ec3f7e9-baa8-486c-b178-fea45ca266aa',
        name: 'Foo',
        status: 'NEW',
        paymentModes: ['BANK_TRANSFER', 'PAYPAL'],
    },
    {
        id: 'f00b7664-a088-455c-92e6-db3627404ea5',
        name: 'Foo',
        status: 'LIVE',
        paymentModes: ['CREDIT_CARD', 'BANK_TRANSFER', 'PAYPAL'],
    },
    {
        id: 'd6b92ccb-3cfd-4f52-8ad6-24b29860966f',
        name: 'Foo',
        status: 'NEW',
        paymentModes: ['BANK_TRANSFER', 'CREDIT_CARD'],
    },
];

describe('DataTable', () => {
    test('should render table', () => {
        render(
            <DataTable
                data={TEST_DATA}
                filters={{ name: '', status: '', paymentModes: [] }}
            />
        );
        const cells = screen.getAllByText('Foo');

        expect(cells.length).toEqual(6);
    });

    test('should render table with filters', () => {
        render(
            <DataTable
                data={TEST_DATA}
                filters={{
                    name: 'Foo',
                    status: 'LIVE',
                    paymentModes: ['BANK_TRANSFER'],
                }}
            />
        );
        const cells = screen.getAllByText('Foo');

        expect(cells.length).toEqual(3);
    });
});
