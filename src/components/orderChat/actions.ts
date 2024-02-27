import axios from 'axios';
import { apiHost } from '../../api/common';
import { SET_CHAT_MESSAGE_DATA, RESET_CHAT_STORE } from './constants';
import {
  setChatMessageDataActionType,
  IMessageData,
  resetChatStoreActionType
} from './interfaces';

export const setChatMessageDataAction = (
  payload: IMessageData
): setChatMessageDataActionType => ({
  type: SET_CHAT_MESSAGE_DATA,
  payload
});

export const resetChatStoreAction = (): resetChatStoreActionType => ({
  type: RESET_CHAT_STORE
});

export const getMessageDataAction = async (
  dialogWith: string,
  orderId: string
): Promise<IMessageData> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiHost}/messages/?dialog_with=${dialogWith}&for_order=${orderId}`
    });

    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const uploadFileAction = async (
  data: {
    filename: string;
    file: string;
  }[]
): Promise<{ id: string; name: string; size: string; url: string }[]> => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${apiHost}/upload/`,
      data: { files: data }
    });
    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};
