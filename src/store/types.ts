import type { Action, ThunkAction } from '@reduxjs/toolkit';

import { rootReducer, store } from './';

// Infer the type of `store`
export type AppStore = typeof store;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
