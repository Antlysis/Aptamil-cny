import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  data?: {
    companyId?: string;
    [key: string]: any;
  };
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.VITE_API_DOMAIN_URL,
  headers: {
    'x-company-id': process.env.VITE_APP_COMPANY_ID_MY,
  },
});

axiosClient.interceptors.request.use(
  (config: CustomRequestConfig) => {
    const companyId = process.env.VITE_APP_COMPANY_ID_MY;
    
    if (companyId) {
      config.headers['company-id'] = companyId;

      if (config.data) {
        config.data.companyId = companyId;
      }

      const token = localStorage.getItem('user-token');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    }
    
    return config;
  },
  (error: any) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

export default axiosClient;