import authApi from '../apis/auth';
import * as types from '../apis/auth/types';
import { apiErrorHandling } from './errorHandling';

export const checkUser = async (data: types.CheckUserData) => {
  const res = await apiErrorHandling({ dataCall: authApi.checkUser, data });
  return res;
};

export const resendOtp = async (data: types.TokenData) => {
  const res = await apiErrorHandling({ dataCall: authApi.token, data });
  return res;
};

export const verifyToken = async (data: types.VerifyTokenData) => {
  const res = await apiErrorHandling({ dataCall: authApi.verifyToken, data });
  return res;
};

export const register = async (data: types.RegisterData) => {
  const res = await apiErrorHandling({ dataCall: authApi.register, data });
  return res;
};

export const getUserDetailsAPI = async () => {
  const res = await apiErrorHandling({ noDataCall: authApi.getUserDetails });
  return res;
};
