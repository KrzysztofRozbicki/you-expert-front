import {
  CategoryItem,
  ServiceItem,
  Subcategory
} from '../../common/interfaceTypes';
import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SET_CATEGORY,
  SET_CATEGORY_SERVICE,
  SET_CATEGORY_SERVICE_LIST,
  SET_CATEGORY_SUBCATEGORIE,
  SET_CATEGORY_SUBCATEGORIES_LIST,
  SET_CATEGORY_SUBCATEGORIES_SERVICE,
  SET_CATEGORY_SUBCATEGORIES_SERVICES_LIST
} from '../types/categories';

export type initialStateType = {
  categoryList: CategoryItem[];
  categoryServiceList: ServiceItem[];
  categorySubcategoryList: Subcategory[];
  categoriesSubcategoriesServicesList: ServiceItem[];
  currentCategory: CategoryItem | null;
  currentSubcategory: Subcategory | null;
  currentService: ServiceItem | null;
  loading: boolean;
  errors: any;
};

export type getCategoriesType = {
  type: typeof GET_CATEGORIES;
};

export type getCategoriesSuccessType = {
  type: typeof GET_CATEGORIES_SUCCESS;
  payload: CategoryItem[];
};

export type getCategoriesFailType = {
  type: typeof GET_CATEGORIES_FAIL;
  payload: any;
};

export type setCategoriesType = {
  type: typeof SET_CATEGORY;
  payload: CategoryItem | null;
};

export type setCategoryServiceType = {
  type: typeof SET_CATEGORY_SERVICE;
  payload: ServiceItem | null;
};

export type setCategoryServiceListType = {
  type: typeof SET_CATEGORY_SERVICE_LIST;
  payload: ServiceItem[];
};

export type setCategorySubcategorieType = {
  type: typeof SET_CATEGORY_SUBCATEGORIE;
  payload: Subcategory | null;
};

export type setCategorySubcategoriesListType = {
  type: typeof SET_CATEGORY_SUBCATEGORIES_LIST;
  payload: Subcategory[];
};

export type setCategorySubcategoriesServiceType = {
  type: typeof SET_CATEGORY_SUBCATEGORIES_SERVICE;
  payload: ServiceItem | null;
};

export type setCategorySubcategoriesServicesListType = {
  type: typeof SET_CATEGORY_SUBCATEGORIES_SERVICES_LIST;
  payload: ServiceItem[];
};

export type categoriesActionType =
  | getCategoriesType
  | getCategoriesSuccessType
  | getCategoriesFailType
  | setCategoriesType
  | setCategoryServiceType
  | setCategoryServiceListType
  | setCategorySubcategorieType
  | setCategorySubcategoriesListType
  | setCategorySubcategoriesServiceType
  | setCategorySubcategoriesServicesListType;
