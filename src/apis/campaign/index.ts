// api
// import {AxiosResponse} from "axios";
import api from '../../configs/api';
import { CheckValidity, CreateEntry, GameReward, UploadImage } from '../auth/types';

const campaignId = import.meta.env.VITE_APP_CAMPAIGN_ID;

const uploadReceiptEndpoint = {
  validity: `/campaign/${campaignId}/validity`,
  uploadImage: `/campaigns/${campaignId}/upload-image`,
  entry: '/campaigns/entries',
  rewardStock: '/rewards/stocks?id=',
};

export const receiptAPI = {
  checkValidity: async () =>
    await api<CheckValidity>({
      method: 'get',
      route: uploadReceiptEndpoint.validity,
    }),

  uploadImage: async (data: FormData) =>
    await api<UploadImage>({
      method: 'post',
      route: uploadReceiptEndpoint.uploadImage,
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  createEntry: async (data: object) =>
    await api<CreateEntry>({
      method: 'post',
      route: uploadReceiptEndpoint.entry,
      data: { ...data },
      headers: { 'accept-version': '~2' },
    }),
};

export const gameAPI = {
  gameReward: async (data: object) =>
    await api<GameReward>({
      method: 'post',
      route: `/game/start`,
      data: { ...data },
    }),

  getRewardStock: async (data: string[]) =>
    await api({
      method: 'get',
      route: uploadReceiptEndpoint.rewardStock + data.join('&id='),
    }),
};
