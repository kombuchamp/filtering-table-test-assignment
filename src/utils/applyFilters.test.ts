import { applyFilters } from './applyFilters';
import { TableEntry } from '../types/TableDataTypes';

const TEST_DATA: TableEntry[] = [
    {
        id: 'e8aa7f39-b88a-4b05-b8bb-31d5bed61158',
        name: 'Foo',
        status: 'LIVE',
        paymentModes: ['BANK_TRANSFER'],
    },
    {
        id: '87a7b3d8-db61-4286-95b3-af202b1a3c24',
        name: 'Bar',
        status: 'LIVE',
        paymentModes: ['CREDIT_CARD', 'BANK_TRANSFER', 'PAYPAL'],
    },
    {
        id: 'e016bac6-cd54-4c5f-8814-8e941cd25417',
        name: 'Harvey LLC',
        status: 'NEW',
        paymentModes: ['CREDIT_CARD'],
    },
    {
        id: '5ec3f7e9-baa8-486c-b178-fea45ca266aa',
        name: 'FooBar',
        status: 'NEW',
        paymentModes: ['BANK_TRANSFER', 'PAYPAL'],
    },
    {
        id: 'f00b7664-a088-455c-92e6-db3627404ea5',
        name: 'BarBaz',
        status: 'LIVE',
        paymentModes: ['CREDIT_CARD', 'BANK_TRANSFER', 'PAYPAL'],
    },
    {
        id: 'd6b92ccb-3cfd-4f52-8ad6-24b29860966f',
        name: 'QUX',
        status: 'NEW',
        paymentModes: ['BANK_TRANSFER', 'CREDIT_CARD'],
    },
];

describe('applyFilters', () => {
    test('should return unfiltered data with empty filters', () => {
        const filteredData = applyFilters(TEST_DATA, {
            paymentModes: [],
            status: '',
            name: '',
        });
        expect(TEST_DATA).toEqual(filteredData);
    });

    test('should apply name filter', () => {
        const filteredData = applyFilters(TEST_DATA, {
            paymentModes: [],
            status: '',
            name: 'foo',
        });
        expect(filteredData.length).toEqual(2);
        for (const entry of filteredData) {
            expect(entry.name.startsWith('Foo')).toBeTruthy();
        }
    });

    test('should apply status filter', () => {
        const filteredData = applyFilters(TEST_DATA, {
            paymentModes: [],
            status: 'LIVE',
            name: '',
        });
        expect(filteredData.length).toEqual(3);
        for (const entry of filteredData) {
            expect(entry.status).toEqual('LIVE');
        }
    });

    test('should apply single payment mode filter', () => {
        const filteredData = applyFilters(TEST_DATA, {
            paymentModes: ['PAYPAL'],
            status: 'LIVE',
            name: '',
        });
        expect(filteredData.length).toEqual(2);
        for (const entry of filteredData) {
            expect(entry.paymentModes.includes('PAYPAL')).toBeTruthy();
        }
    });

    test('should apply multiple payment modes filter', () => {
        const filteredData = applyFilters(TEST_DATA, {
            paymentModes: ['CREDIT_CARD', 'BANK_TRANSFER', 'PAYPAL'],
            status: '',
            name: '',
        });
        expect(filteredData.length).toEqual(2);
        for (const entry of filteredData) {
            expect(entry.paymentModes).toEqual([
                'CREDIT_CARD',
                'BANK_TRANSFER',
                'PAYPAL',
            ]);
        }
    });

    test('should apply multiple filters', () => {
        const filteredData = applyFilters(TEST_DATA, {
            paymentModes: ['CREDIT_CARD', 'BANK_TRANSFER', 'PAYPAL'],
            status: 'LIVE',
            name: 'BarBaz',
        });
        expect(filteredData.length).toEqual(1);
        expect(filteredData.at(0)).toEqual({
            id: 'f00b7664-a088-455c-92e6-db3627404ea5',
            name: 'BarBaz',
            status: 'LIVE',
            paymentModes: ['CREDIT_CARD', 'BANK_TRANSFER', 'PAYPAL'],
        });
    });
});
