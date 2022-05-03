import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Dispatch, RootState } from '../store/store';

/**
 * Typed redux hooks
 *
 * @see https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
 */

export const useTypedDispatch = () => useDispatch<Dispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
