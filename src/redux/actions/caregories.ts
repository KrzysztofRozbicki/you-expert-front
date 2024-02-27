import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SET_CATEGORY,
  SET_CATEGORY_SERVICE_LIST,
  SET_CATEGORY_SERVICE,
  SET_CATEGORY_SUBCATEGORIE,
  SET_CATEGORY_SUBCATEGORIES_LIST,
  SET_CATEGORY_SUBCATEGORIES_SERVICE,
  SET_CATEGORY_SUBCATEGORIES_SERVICES_LIST
} from '../types/categories';

import {
  getAllCategories,
  getCategoriesTree,
  getCategoryById,
  getCategoryServiceList,
  getServiceByIdFromCategory,
  getSubcategoriesFromCategory,
  getSubcategorByIdFromCategory,
  getCategoriesSubcategoriesServicesList,
  getCategoriesSubcategoriesServiceById
} from '../../api/categories';
import {
  getCategoriesType,
  getCategoriesSuccessType,
  getCategoriesFailType,
  setCategoriesType,
  setCategoryServiceListType,
  setCategoryServiceType,
  setCategorySubcategoriesListType,
  setCategorySubcategorieType,
  setCategorySubcategoriesServicesListType,
  setCategorySubcategoriesServiceType
} from '../interfaces/categories';

export const getCategories = (): getCategoriesType => ({
  type: GET_CATEGORIES
});

export const getCategoriesSuccess = (data): getCategoriesSuccessType => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: data
});

export const getCategoriesFail = (error): getCategoriesFailType => ({
  type: GET_CATEGORIES_FAIL,
  payload: error
});

export const getCategoriesAction = () => {
  return async (dispatch) => {
    try {
      dispatch(getCategories());
      const result = await getAllCategories();
      if (result && result.data && result.data.length) {
        dispatch(getCategoriesSuccess(result.data));
      } else {
        dispatch(getCategoriesFail('Something went wrong.'));
      }
    } catch (error) {
      dispatch(getCategoriesFail(error));
    }
  };
};

export const getCategoriesTreeAction = () => {
  return async (dispatch) => {
    try {
      dispatch(getCategories());
      const result = await getCategoriesTree();
      if (result && result.data && result.data.length) {
        dispatch(getCategoriesSuccess(result.data));
      } else {
        dispatch(getCategoriesFail('Something went wrong.'));
      }
    } catch (error) {
      dispatch(getCategoriesFail(error));
    }
  };
};

export const setCurrentCategory = (data): setCategoriesType => ({
  type: SET_CATEGORY,
  payload: data
});

export const getCategoryByIdAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getCategories());
      const result = await getCategoryById(id);
      if (result && result.data && result.data.length) {
        dispatch(setCurrentCategory(result.data));
      } else {
        dispatch(getCategoriesFail('Something went wrong.'));
      }
    } catch (error) {
      dispatch(getCategoriesFail(error));
    }
  };
};

export const setCategoryServiceList = (data): setCategoryServiceListType => ({
  type: SET_CATEGORY_SERVICE_LIST,
  payload: data
});

export const getCategoryServiceListAction = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch(getCategories());
      const result = await getCategoryServiceList(categoryId);
      if (result && result.data && result.data.length) {
        dispatch(setCategoryServiceList(result.data));
      } else {
        dispatch(getCategoriesFail('Something went wrong.'));
      }
    } catch (error) {
      dispatch(getCategoriesFail(error));
    }
  };
};

export const setServiceFromCategory = (data): setCategoryServiceType => ({
  type: SET_CATEGORY_SERVICE,
  payload: data
});

export const getServiceByIdFromCategoryAction = (categoryId, serviceId) => {
  return async (dispatch) => {
    try {
      dispatch(getCategories());
      const result = await getServiceByIdFromCategory(categoryId, serviceId);
      if (result && result.data && result.data.length) {
        dispatch(setServiceFromCategory(result.data));
      } else {
        dispatch(getCategoriesFail('Something went wrong.'));
      }
    } catch (error) {
      dispatch(getCategoriesFail(error));
    }
  };
};

export const setSubcategoriesFromCategory = (
  data
): setCategorySubcategoriesListType => ({
  type: SET_CATEGORY_SUBCATEGORIES_LIST,
  payload: data
});

export const getSubcategoriesFromCategoryAction = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch(getCategories());
      const result = await getSubcategoriesFromCategory(categoryId);
      if (result && result.data && result.data.length) {
        dispatch(setSubcategoriesFromCategory(result.data));
      } else {
        dispatch(getCategoriesFail('Something went wrong.'));
      }
    } catch (error) {
      dispatch(getCategoriesFail(error));
    }
  };
};

export const setSubcategorByIdFromCategory = (
  data
): setCategorySubcategorieType => ({
  type: SET_CATEGORY_SUBCATEGORIE,
  payload: data
});

export const getSubcategorByIdFromCategoryAction = (
  categoryId,
  subcategoryId
) => {
  return async (dispatch) => {
    try {
      dispatch(getCategories());
      const result = await getSubcategorByIdFromCategory(
        categoryId,
        subcategoryId
      );
      if (result && result.data && result.data.length) {
        dispatch(setSubcategorByIdFromCategory(result.data));
      } else {
        dispatch(getCategoriesFail('Something went wrong.'));
      }
    } catch (error) {
      dispatch(getCategoriesFail(error));
    }
  };
};

export const setCategoriesSubcategoriesServicesList = (
  data
): setCategorySubcategoriesServicesListType => ({
  type: SET_CATEGORY_SUBCATEGORIES_SERVICES_LIST,
  payload: data
});

export const getCategoriesSubcategoriesServicesListAction = (
  categoryId,
  subcategoryId
) => {
  return async (dispatch) => {
    try {
      dispatch(getCategories());
      const result = await getCategoriesSubcategoriesServicesList(
        categoryId,
        subcategoryId
      );
      if (result && result.data && result.data.length) {
        dispatch(setCategoriesSubcategoriesServicesList(result.data));
      } else {
        dispatch(getCategoriesFail('Something went wrong.'));
      }
    } catch (error) {
      dispatch(getCategoriesFail(error));
    }
  };
};

export const setCategoriesSubcategoriesServiceById = (
  data
): setCategorySubcategoriesServiceType => ({
  type: SET_CATEGORY_SUBCATEGORIES_SERVICE,
  payload: data
});

export const getCategoriesSubcategoriesServiceByIdAction = (
  categoryId,
  subcategoryId,
  serviceId
) => {
  return async (dispatch) => {
    try {
      dispatch(getCategories());
      const result = await getCategoriesSubcategoriesServiceById(
        categoryId,
        subcategoryId,
        serviceId
      );
      if (result && result.data && result.data.length) {
        dispatch(setSubcategorByIdFromCategory(result.data));
      } else {
        dispatch(getCategoriesFail('Something went wrong.'));
      }
    } catch (error) {
      dispatch(getCategoriesFail(error));
    }
  };
};
