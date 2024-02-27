import axios from 'axios';

import { apiHost } from '../common';

export const getAllOrders = async () => {
  return axios({
    method: 'get',
    url: `${apiHost}/orders/`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const deleteOrder = async (id) => {
  return axios({
    method: 'delete',
    url: `${apiHost}/orders/${id}/`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const getUserDashboardOrders = async (
  active: boolean,
  historical: boolean
) => {
  return axios({
    method: 'get',
    url: `${apiHost}/orders/user-dashboard-orders/?active=${active}&historical=${historical}`,
    headers: {
      'Content-Type': 'application/json'
      // token: localStorage.getItem('expertToken')
    }
  });
};

export const getExpertDashboardAssignments = async (
  active: boolean,
  historical: boolean
) => {
  return axios({
    method: 'get',
    url: `${apiHost}/orders/expert-dashboard-assignments/?active=${active}&historical=${historical}`,
    headers: {
      'Content-Type': 'application/json'
      // token: localStorage.getItem('expertToken')
    }
  });
};

export const getActiveExpertOrders = async () => {
  return axios({
    method: 'get',
    url: `${apiHost}/orders/expert-dashboard-orders&active=True/`,
    headers: {
      'Content-Type': 'application/json'
      // token: localStorage.getItem('expertToken')
    }
  });
};

export const getExpertHistoricalOrders = async () => {
  return axios({
    method: 'get',
    url: `${apiHost}/orders/expert-orders&historical=true/`,
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('expertToken')
    }
  });
};

export const getActiveUserOrders = async () => {
  return axios({
    method: 'get',
    url: `${apiHost}/orders/user-dashboard-orders&active=True/`,
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('expertToken')
    }
  });
};

export const getHistoricalUserOrders = async () => {
  return axios({
    method: 'get',
    url: `${apiHost}/orders/user-orders&historical=true/`,
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('expertToken')
    }
  });
};
