import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { API } from '../services/API';
import { filtersReducer } from './reducers/Filters';
import { themeReducer } from './reducers/Theme';

const rootReducer = combineReducers({
    filtersReducer,
    themeReducer,
    // RTK Query reducer
    [API.reducerPath]: API.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(API.middleware),
    });
};

/**
 * Redux-related types
 *
 * @see https://redux.js.org/usage/usage-with-typescript
 */

export type RootState = ReturnType<typeof rootReducer>;
export type Store = ReturnType<typeof setupStore>;
export type Dispatch = Store['dispatch'];
