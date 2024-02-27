import axios from 'axios';
import { apiHost } from '../common';

const notificationsURL = `${apiHost}/notifications/`;

export const getNotifications = (page, pageSize) => {
  return axios({
    method: 'get',
    url: `${notificationsURL}`,
    params: {
      page,
      page_size: pageSize
    }
  });
};

export const saveNotifications = (id) => {
  return axios({
    method: 'post',
    url: `${notificationsURL}${id}/save/`
  });
};

export const unsaveNotifications = (id) => {
  return axios({
    method: 'post',
    url: `${notificationsURL}${id}/unsave/`
  });
};
