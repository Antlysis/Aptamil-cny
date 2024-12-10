import { PayloadAction } from '@reduxjs/toolkit';

import * as authTypes from '../apis/auth/types';
import * as userTypes from '../apis/user/types';
import { createAppSlice } from './utils';

export interface UserSliceState {
  user: authTypes.getUserDetailsOutput | null;
  isAuthenticated: boolean;
  redeemHistory: userTypes.getRedeemHistoryOutput | null;
  pointHistory: userTypes.getPointHistoryOutput | null;
}

const initialState: UserSliceState = {
  user: null,
  isAuthenticated: false,
  redeemHistory: null,
  pointHistory: null,
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,

  reducers: create => ({
    userLogin: create.reducer(state => {
      state.isAuthenticated = true;
    }),
    userLogout: create.reducer(state => {
      state.isAuthenticated = false;
      state.pointHistory = null;
      state.redeemHistory = null;
      state.user = null;
    }),
    setUserDetails: create.reducer(
      (state, action: PayloadAction<authTypes.getUserDetailsOutput>) => {
        state.user = action.payload;
      }
    ),
    setRedeemHistory: create.reducer(
      (state, action: PayloadAction<userTypes.getRedeemHistoryOutput>) => {
        state.redeemHistory = action.payload;
      }
    ),
    setPointHistory: create.reducer(
      (state, action: PayloadAction<userTypes.getPointHistoryOutput>) => {
        state.pointHistory = action.payload;
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    getIsAuthenticated: state => state.isAuthenticated,
    getUserDetails: state => state.user,
    getRedeemHistorySelector: state => state.redeemHistory,
    getPointHistorySelector: state => state.pointHistory,
  },
});

export const {
  userLogin,
  userLogout,
  setUserDetails,
  setRedeemHistory,
  setPointHistory,
} = userSlice.actions;
export const {
  getIsAuthenticated,
  getUserDetails,
  getRedeemHistorySelector,
  getPointHistorySelector,
} = userSlice.selectors;
