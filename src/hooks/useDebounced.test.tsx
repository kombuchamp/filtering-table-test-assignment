import React, { FC, useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { useDebounced } from './useDebounced';

describe('useDebounced', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    const TestComponent: FC = () => {
        const [state, setState] = useState(0);
        const debouncedState = useDebounced(state, 1000);

        return (
            <div
                data-testid={'debounced-state'}
                onClick={() => setState((x) => x + 1)}
            >
                {debouncedState}
            </div>
        );
    };

    test('should debounce value', async () => {
        render(<TestComponent />);
        const element = screen.getByTestId('debounced-state');

        expect(element.textContent).toEqual('0');

        fireEvent.click(element);
        act(() => {
            jest.advanceTimersByTime(100);
        });

        fireEvent.click(element);
        fireEvent.click(element);
        fireEvent.click(element);
        act(() => {
            jest.advanceTimersByTime(100);
        });

        fireEvent.click(element);

        expect(element.textContent).toEqual('0');

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(element.textContent).toEqual('5');
    });
});
