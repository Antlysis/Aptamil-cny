// api
// import {AxiosResponse} from "axios";
import api from '../configs/api';
import { CheckValidity, CreateEntry, UploadImage } from './auth/types';

const campaignId = import.meta.env.VITE_APP_CAMPAIGN_ID;

const uploadReceiptEndpoint = {
  validity: `/campaign/${campaignId}/validity`,
  uploadImage: `/campaigns/${campaignId}/upload-image`,
  entry: '/campaigns/entries',
};

// const userEndpoint = {
//     userDetails: "/users/details"
// }

// const shopItemsEndpoint = {
//     shopItems: "/shop-items"
// }

export const receiptAPI = {
  checkValidity: async () =>
    await api<CheckValidity>({
      method: 'get',
      route: uploadReceiptEndpoint.validity,
    }),
  uploadImage: async (data: object) =>
    await api<UploadImage>({
      method: 'post',
      route: uploadReceiptEndpoint.uploadImage,
      ...data,
    }),
  createEntry: async (data: object) =>
    await api<CreateEntry>({
      method: 'post',
      route: uploadReceiptEndpoint.entry,
      ...data,
    }),
};

// export const shopItemsAPI = {
//     getShopItems: async (): Promise<AxiosResponse<any>> => await api.get(shopItemsEndpoint.shopItems)
// }
// export const userAPI = {
//     getUserData: async () => await api.get(userEndpoint.userDetails)
// }

// export const authAPI = {
//     getUser: async () => await api.get(""),
//     login: async () => await api.post("")
// }
