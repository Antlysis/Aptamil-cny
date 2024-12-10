import api from '../../configs/api';
import * as types from './types';

const endpoints = {
  register: '/auth/register',
  registerOTP: '/auth/register-otp',
  RBRegisterOTP: '/auth/rb-register-otp',
  token: '/auth/token',
  verifyToken: '/auth/verify-token',
  OTP: '/auth/otp',
  login: '/auth/login',
  loginOTP: '/auth/login-otp',
  loginPhone: '/auth/login/phone',
  setPass: '/auth/setpass',
  resetPass: '/auth/password-reset-email',
  checkQR: '/auth/check-qr',
  checkUser: '/auth/check-user',
  getUserDetails: '/users/details',
};

const authApi = {
  register: async (data: types.RegisterData) =>
    await api<types.Register>({
      method: 'post',
      route: endpoints.register,
      data: {...data},
    }),

  registerOTP: async (data: types.RegisterOTPData) =>
    await api<types.RegisterOTP>({
      method: 'post',
      route: endpoints.registerOTP,
      data: {...data},
    }),

  RBRegisterOTP: async (data: types.RBRegisterOTPData) =>
    await api<types.RBRegisterOTP>({
      method: 'post',
      route: endpoints.RBRegisterOTP,
      data: {...data},
    }),

  token: async (data: types.TokenData) =>
    await api<types.Token>({
      method: 'post',
      route: endpoints.token,
      data: {...data},
    }),

  verifyToken: async (data: types.VerifyTokenData) =>
    await api<types.VerifyToken>({
      method: 'post',
      route: endpoints.verifyToken,
      data: {...data},
    }),

  otp: async (data: types.OTPData) =>
    await api<types.OTP>({
      method: 'post',
      route: endpoints.OTP,
      data: {...data},
    }),

  login: async (data: types.LoginData) =>
    await api<types.Login>({
      method: 'post',
      route: endpoints.login,
      data: {...data},
    }),

  loginOTP: async (data: types.LoginOTPData) =>
    await api<types.LoginOTP>({
      method: 'post',
      route: endpoints.loginOTP,
      data: {...data},
    }),

  loginPhone: async (data: types.LoginPhoneData) =>
    await api<types.LoginPhone>({
      method: 'post',
      route: endpoints.loginPhone,
      data: {...data},
    }),

  setPass: async (data: types.SetPassData) =>
    await api<types.SetPass>({
      method: 'post',
      route: endpoints.setPass,
      data: {...data},
    }),

  resetPass: async (data: types.ResetPassData) =>
    await api<types.ResetPass>({
      method: 'post',
      route: endpoints.resetPass,
      data: {...data},
    }),

  checkQR: async (data: types.CheckQRData) =>
    await api<types.CheckQR>({
      method: 'post',
      route: endpoints.checkQR,
      data: {...data},
    }),

  checkUser: async (data: types.CheckUserData) =>
    await api<types.CheckUser>({
      method: 'post',
      route: endpoints.checkUser,
      data: { ...data },
    }),

  getUserDetails: async () => 
    await api<types.getUserDetailsOutput>({
      method: 'get',
      route: endpoints.getUserDetails,
    }),
};

export default authApi;
