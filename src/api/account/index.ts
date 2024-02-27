import axios from 'axios';

import { apiHost } from '../common';

const updatedHost = `${apiHost}/accounts/`;

export const registerUser = async (data) => {
  return axios({
    method: 'post',
    url: `${updatedHost}register/`,
    data
  });
};

export const userEmailConfirm = async (email) => {
  return axios({
    method: 'post',
    url: `${updatedHost}email-confirm/`,
    data: {
      email
    }
  });
};

export const getUserDataById = async (id) => {
  return axios({
    method: 'get',
    url: `${updatedHost}profile/${id}/`
  });
};

export const completeUserEmailConfirm = async (uid, token) => {
  return axios({
    method: 'post',
    url: `${updatedHost}complete-email-confirm/`,
    data: {
      uid,
      token
    }
  });
};

export const getPublicUserDataById = async (id) => {
  return axios({
    method: 'get',
    url: `${updatedHost}safe-profile/${id}/`
  });
};

export const getDialogId = async (userId: number): Promise<any> => {
  try {
    const res = await axios({
      method: 'post',
      url: `${apiHost}/dialogs/`,
      data: { user: userId }
    });

    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const rateUser = async (uid, rating) => {
  return axios({
    method: 'post',
    url: `${updatedHost}rate-user/`,
    data: {
      rating,
      to_user: uid
    }
  });
};

export const editUser = async (uid, data) => {
  return axios.patch(`${updatedHost}profile/${uid}/`, { ...data });
};

export const resetUserPassword = async (email) => {
  return axios({
    method: 'post',
    url: `${updatedHost}reset-password/`,
    data: {
      email
    }
  });
};

export const setUserPassword = async (uid, token, password) => {
  return axios({
    method: 'post',
    url: `${updatedHost}set-password/`,
    data: {
      uid,
      token,
      password
    }
  });
};

export const getBalance = async (id: number | string, params?: any) => {
  return axios({
    method: 'get',
    url: `${updatedHost}profile/${id}/balance/`,
    params
  });
};
