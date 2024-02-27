import axios from 'axios';
import { apiHost } from '../../api/common';
import { SET_INBOX_DIALOGS, SET_INBOX_DIALOG_MESSAGES } from './constants';
import {
  setInboxDialogsActionType,
  setInboxDialogMessagesActionType,
  IDialogs,
  IMessages
} from './interfaces';

export const setInboxDialogsAction = (
  payload: IDialogs
): setInboxDialogsActionType => ({
  type: SET_INBOX_DIALOGS,
  payload
});

export const setInboxDialogMessagesAction = (
  payload: IMessages
): setInboxDialogMessagesActionType => ({
  type: SET_INBOX_DIALOG_MESSAGES,
  payload
});

export const getInboxDialogsAction = async (): Promise<IDialogs> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiHost}/dialogs/`
    });

    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getInboxDialogMessages = async (
  dialogWith: number | string
): Promise<IMessages> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiHost}/messages/?dialog_with=${dialogWith}`
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
