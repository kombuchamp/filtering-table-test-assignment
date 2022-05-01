import { TableEntry } from '../../types/TableDataTypes';
import { Filters } from '../../store/reducers/Filters';

/**
 * Applies filters to data
 *
 */
export const applyFilters = (data: TableEntry[], filters: Filters) => {
    return data.filter(({ name, paymentModes, status }) => {
        if (filters.name && !name.startsWith(filters.name)) {
            return false;
        }
        if (filters.status && status !== filters.status) {
            return false;
        }
        if (
            filters.paymentModes.length &&
            !filters.paymentModes.every((pm) => paymentModes.includes(pm))
        ) {
            return false;
        }
        return true;
    });
};
