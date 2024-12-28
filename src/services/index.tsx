import { gameAPI, receiptAPI } from '../apis/campaign';
import { apiErrorHandling } from './errorHandling';

export const checkValidity = async () => {
  const res = await apiErrorHandling({ noDataCall: receiptAPI.checkValidity });
  if (res) {
    return res.data;
  }
};

export const uploadImage = async (data: FormData) => {
  const res = await apiErrorHandling({ dataCall: receiptAPI.uploadImage, data });
  if (res) {
    return res;
  }
};

export const createEntry = async (data: object) => {
  const res = await apiErrorHandling({ dataCall: receiptAPI.createEntry, data });
  if (res) {
    return res;
  }
};

export const gameReward = async (data: object) => {
  const res = await apiErrorHandling({ dataCall: gameAPI.gameReward, data });
  if (res) {
    return res;
  }
};

export const getRewardStock = async (data: string[]) => {
  console.log('services: ', data);
  const res = await apiErrorHandling({ dataCall: gameAPI.getRewardStock, data });
  if (res) {
    return res;
  }
};