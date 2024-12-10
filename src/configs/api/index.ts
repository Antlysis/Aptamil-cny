import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { ApiParams } from './types';
import { getEndpoint } from './utils';

const api = <DataType>({
  route,
  method = 'get',
  headers = {},
  data,
}: ApiParams): Promise<AxiosResponse<DataType>> => {
  const defaultHeader = {
    'Content-Type': 'application/json',
    'x-company-id': import.meta.env.VITE_APP_COMPANY_ID_MY,
    'x-secret': import.meta.env.VITE_APP_SLEEKFLOW_SECRET,
  };
  const token = Cookies.get('token');
  const { apiURL, apiHeaders } = getEndpoint(route);
  const authorizationHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const config: AxiosRequestConfig = {
    method,
    url: apiURL,
    headers: {
      ...defaultHeader,
      ...apiHeaders,
      ...authorizationHeader,
      ...headers,
    },
    params: method === 'get' ? data : {},
    data: method === 'post' || method === 'put' ? data : undefined,
  };
  return axios(config)
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export default api;
