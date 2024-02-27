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
  initialStateType,
  categoriesActionType
} from '../interfaces/categories';

const initialState: initialStateType = {
  categoryList: [],
  categoryServiceList: [],
  categorySubcategoryList: [],
  categoriesSubcategoriesServicesList: [],
  currentCategory: null,
  currentSubcategory: null,
  currentService: null,
  loading: false,
  errors: null
};

const categoriesStore = (
  state = initialState,
  action: categoriesActionType
): initialStateType => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return { ...state, loading: true };
    }

    case GET_CATEGORIES_SUCCESS: {
      return { ...state, categoryList: action.payload, loading: false };
    }

    case GET_CATEGORIES_FAIL: {
      return { ...state, loading: false, errors: action.payload };
    }

    case SET_CATEGORY: {
      return { ...state, loading: false, currentCategory: action.payload };
    }

    case SET_CATEGORY_SERVICE: {
      return { ...state, loading: false, currentService: action.payload };
    }

    case SET_CATEGORY_SERVICE_LIST: {
      return { ...state, loading: false, categoryServiceList: action.payload };
    }
    case SET_CATEGORY_SUBCATEGORIE: {
      return { ...state, loading: false, currentSubcategory: action.payload };
    }
    case SET_CATEGORY_SUBCATEGORIES_LIST: {
      return {
        ...state,
        loading: false,
        categorySubcategoryList: action.payload
      };
    }
    case SET_CATEGORY_SUBCATEGORIES_SERVICE: {
      return { ...state, loading: false, currentService: action.payload };
    }
    case SET_CATEGORY_SUBCATEGORIES_SERVICES_LIST: {
      return {
        ...state,
        loading: false,
        categoriesSubcategoriesServicesList: action.payload
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default categoriesStore;
