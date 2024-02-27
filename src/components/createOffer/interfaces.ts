import {
  SET_CREATE_OFFER_STATE,
  SET_CREATE_OFFER_LOADING,
  SET_CREATE_OFFER_PARAMS,
  RESET_CREATE_OFFER_STORE,
  SET_CREATE_OFFER_CATEGORIES,
  SET_CREATE_OFFER_PUBLISHED_DATA
} from './constants';

export interface categoryItem {
  id?: number;
  label: string;
  value: string;
  slug: string;
  subcategories?: any[];
}

export interface imageItem {
  id: number;
  filename: string;
  file: string;
  isOfferImage?: boolean;
}

export interface videoItem {
  id: number;
  videoUrl: string;
}

export interface offerType {
  serviceTitle: string;
  category: categoryItem;
  subcategory: categoryItem;
  pricing: pricingState;
  service: categoryItem;
  description: string;
  images: imageItem[];
  videos: videoItem[];
  requirements: string;
  commission: string;
}

export interface serviceParameters {
  id: number;
  name: string;
  title: string;
  isOptional: boolean;
  type: string;
  choices: any[];
}

export interface paramsByServiceType {
  id?: number;
  name: string;
  slug: string;
  parameters: serviceParameters[];
}

export interface pricingParamsItem {
  id: number;
  name: string;
  value: any;
  type: string;
  isOptional: boolean;
}

export interface pricingPackage {
  isOn: boolean;
  deliveryTime: string;
  price: string;
  params: pricingParamsItem[];
}

export interface pricingState {
  basic: pricingPackage;
  standard: pricingPackage;
  premium: pricingPackage;
}

export interface categoriesItem {
  id: number;
  name: string;
  slug: string;
  services: {
    id: number;
    name: string;
    slug: string;
  }[];
}

export interface subcategoryItem extends categoriesItem {
  category: number;
}

export interface createOfferInitialState {
  isLoading: boolean;
  offer: offerType;
  paramsByService: paramsByServiceType;
  isPublished: boolean;
  publishedData: any;
  categories: categoriesItem[];
  subcategories: subcategoryItem[];
}

export type setCreateOfferStateActionType = {
  type: typeof SET_CREATE_OFFER_STATE;
  payload: offerType;
};

export type setCreateOfferLoadingActionType = {
  type: typeof SET_CREATE_OFFER_LOADING;
  payload: boolean;
};

export type setCreateOfferParamsActionType = {
  type: typeof SET_CREATE_OFFER_PARAMS;
  payload: {
    paramsByService: paramsByServiceType;
    pricingParams: pricingParamsItem[];
  };
};

export type resetCreateOfferStoreActionType = {
  type: typeof RESET_CREATE_OFFER_STORE;
};

export type setCreateOfferPublishedDataActionType = {
  type: typeof SET_CREATE_OFFER_PUBLISHED_DATA;
  payload: any;
};

export type setCreateOfferCategoriesActionType = {
  type: typeof SET_CREATE_OFFER_CATEGORIES;
  payload: {
    categories: categoriesItem[];
    subcategories: subcategoryItem[];
  };
};

export type createOfferActions =
  | setCreateOfferStateActionType
  | setCreateOfferLoadingActionType
  | setCreateOfferParamsActionType
  | resetCreateOfferStoreActionType
  | setCreateOfferPublishedDataActionType
  | setCreateOfferCategoriesActionType;
