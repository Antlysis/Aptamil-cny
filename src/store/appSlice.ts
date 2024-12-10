import { createAppSlice } from './utils';

export interface AppSliceState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AppSliceState = {
  value: 0,
  status: 'idle',
};

export const appSlice = createAppSlice({
  name: 'app',
  initialState,

  reducers: create => ({
    increment: create.reducer(state => {
      state.value += 1;
    }),
    decrement: create.reducer(state => {
      state.value -= 1;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectCount: counter => counter.value,
  },
});

// Action creators are generated for each case reducer function.
export const { decrement, increment } = appSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCount } = appSlice.selectors;
