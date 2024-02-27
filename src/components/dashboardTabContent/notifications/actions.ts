import axios from 'axios';
import { INotificationItem } from './interfaces';
import { NOTIFICATION_PER_PAGE } from './constants';
import { apiHost } from '../../../api/common';

export const getNotificationsAction = async (
  page: number,
  pageSize = NOTIFICATION_PER_PAGE
): Promise<INotificationItem[]> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiHost}/notifications/`,
      params: {
        page,
        page_size: pageSize
      }
    });
    return res?.data?.results;
  } catch (e) {
    throw new Error(e);
  }
};

export const saveUnsaveNotificationAction = async (
  id: number,
  isSaved: boolean
): Promise<void> => {
  try {
    if (isSaved) {
      await axios({
        method: 'post',
        url: `${apiHost}/notifications/${id}/unsave/`
      });
      return;
    }

    await axios({
      method: 'post',
      url: `${apiHost}/notifications/${id}/save/`
    });
  } catch (e) {
    throw new Error(e);
  }
};
