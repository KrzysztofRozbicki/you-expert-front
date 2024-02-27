import axios from 'axios';
import { apiHost } from '../common';

export const getAllCategories = async () => {
  return axios({
    method: 'get',
    url: `${apiHost}/categories/`
  });
};

export const getCategoriesTree = async () => {
  return axios({
    method: 'get',
    url: `${apiHost}/category-tree/`
  });
};

export const getCategoryById = async (categoryId) => {
  return axios({
    method: 'get',
    url: `${apiHost}/categories/${categoryId}/`
  });
};

export const getCategoryServiceList = async (categoryId) => {
  return axios({
    method: 'get',
    url: `${apiHost}/categories/${categoryId}/services/`
  });
};

export const getServiceByIdFromCategory = async (categoryId, serviceId) => {
  return axios({
    method: 'get',
    url: `${apiHost}/categories/${categoryId}/services/${serviceId}/`
  });
};

export const getSubcategoriesFromCategory = async (categoryId) => {
  return axios({
    method: 'get',
    url: `${apiHost}/categories/${categoryId}/subcategories/`
  });
};

export const getSubcategorByIdFromCategory = async (
  categoryId,
  subcategoryId
) => {
  return axios({
    method: 'get',
    url: `${apiHost}/categories/${categoryId}/subcategories/${subcategoryId}/`
  });
};

export const getCategoriesSubcategoriesServicesList = async (
  categoryId,
  subcategoryId
) => {
  return axios({
    method: 'get',
    url: `${apiHost}/categories/${categoryId}/subcategories/${subcategoryId}/services/`
  });
};

export const getCategoriesSubcategoriesServiceById = async (
  categoryId,
  subcategoryId,
  serviceId
) => {
  return axios({
    method: 'get',
    url: `${apiHost}/categories/${categoryId}/subcategories/${subcategoryId}/services/${serviceId}/`
  });
};
