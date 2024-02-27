import axios from 'axios';
import { apiHost } from '../common';

export const getToken = async (data) => {
  return axios({
    method: 'post',
    url: `${apiHost}/token/`,
    data
  });
};

export const refreshTokenApi = async (data) => {
  return axios({
    method: 'post',
    url: `${apiHost}/token/refresh/`,
    data
  });
};

export const loginUserViaFB = async (auth_token) => {
  return axios({
    method: 'post',
    url: `${apiHost}/login/social/facebook/`,
    data: {
      auth_token
    }
  });
};
