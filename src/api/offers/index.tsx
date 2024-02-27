import axios from 'axios';

import { apiHost } from '../common';

export const getAllOffers = async (params) => {
  return axios({
    method: 'get',
    url: `${apiHost}/offers/`,
    headers: {
      'Content-Type': 'application/json'
    },
    params: params
  });
};

export const searchCategories = async (data) => {
  const searchUrl = `${apiHost}/search-categories/`;
  if (typeof data === 'string') {
    return axios({
      method: 'get',
      url: `${searchUrl}?name=${data}`
    });
  }

  if (typeof data === 'number') {
    return axios({
      method: 'get',
      url: `${searchUrl}?page=${data}`
    });
  }

  return axios({
    method: 'get',
    url: searchUrl
  });
};

export const createOffer = async (offer) => {
  return axios({
    method: 'post',
    url: `${apiHost}/offers_create/`,
    data: {
      offer
    }
  });
};

// Retrieve offers list of authenticated expert

export const getOffersRetrieveSelfOfferList = async () => {
  return axios({
    method: 'get',
    url: `${apiHost}/offers/self/`
  });
};

export const getOfferById = async (id) => {
  return axios({
    method: 'get',
    url: `${apiHost}/offers/${id}/`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// Archive offer if offer have any related orders and create new one based on archived with updated fields
export const editOffer = async (id, newData) => {
  return axios({
    method: 'put',
    url: `${apiHost}/offers/${id}/`,
    data: {
      offer: newData
    }
  });
};

// Archive offer if offer have any related orders and create new one based on archived with partial updated fields

export const editPartialOffer = async (id, newData) => {
  return axios({
    method: 'patch',
    url: `${apiHost}/offers/${id}/`,
    data: {
      offer: newData
    }
  });
};

export const activateOffer = async (id) => {
  return axios({
    method: 'post',
    url: `${apiHost}/offers/${id}/activate/`
  });
};

export const archiveOffer = async (id, data) => {
  return axios({
    method: 'post',
    url: `${apiHost}/offers/${id}/archive/`,
    data: {
      offer: data
    }
  });
};

export const deactivateOffer = async (id) => {
  return axios({
    method: 'post',
    url: `${apiHost}/offers/${id}/deactivate/`
    // url: `${apiHost}/offers/${id}/deactivate/`,
  });
};

export const followOffer = async (id) => {
  return axios({
    method: 'post',
    url: `${apiHost}/offers/${id}/follow/`
  });
};

export const unfollowOffer = async (id) => {
  return axios({
    method: 'post',
    url: `${apiHost}/offers/${id}/unfollow/`
  });
};

export const getOffersSelf = async () => {
  return axios({
    method: 'get',
    url: `${apiHost}/offers/self/`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const getFollowingOffers = async () => {
  return axios({
    method: 'get',
    url: `${apiHost}/offers/following/`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
