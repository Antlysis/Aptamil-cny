import { AxiosHeaders, Method, RawAxiosRequestHeaders } from 'axios';

type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;

export interface ApiParams {
  route: string;
  method: 'get' | 'post' | 'put' | 'delete';
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
  data?:
    | FormData
    | {
        [key: string]: string | number | boolean | null | string[];
      };
}
