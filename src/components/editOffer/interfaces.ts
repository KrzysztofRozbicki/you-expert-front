import {
  SET_EDIT_OFFER_INITIAL_DATA,
  RESET_EDIT_OFFER_STORE,
  SET_EDIT_OFFER_EDITABLE_DATA,
  SET_EDIT_OFFER_PUBLISHED_DATA
} from './constants';

export interface IInitialOfferData {
  createdAt: string;
  currencySign: string;
  deliveryDateInDaysBasic: number;
  deliveryDateInDaysPremium: number;
  deliveryDateInDaysStandard: number;
  description: string;
  expert: {
    avatarUrl: string;
    id: number;
    publicName: string;
    rating: string;
    reviewCount: number;
    title: string;
  };
  gallery: galleryItem[];
  id: number;
  isActive: boolean;
  isArchived: boolean;
  isFollowed: boolean;
  parameterAnswersBasic: {
    [key: string]: any;
  };
  parameterAnswersPremium: {
    [key: string]: any;
  };
  parameterAnswersStandard: {
    [key: string]: any;
  };
  priceBasic: string;
  pricePremium: string;
  priceStandard: string;
  representationImage: string;
  requirements: string;
  service: {
    id: number;
    name: string;
    slug: string;
  };
  serviceCategory: {
    id: number;
    name: string;
    slug: string;
  };
  serviceSubcategory: {
    id: number;
    name: string;
    slug: string;
  };
  title: string;
  commissionRate: number;
}

export interface categoryItem {
  id?: number;
  label: string;
  value: string;
  slug: string;
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

export type imageItem = {
  id: number;
  type: 'image';
  filename: string;
  file?: string;
  imageUrl?: string;
  indexValue?: number;
  isNew?: boolean;
  isOfferImage?: boolean;
};

export type videoItem = {
  id: number;
  videoUrl: string;
  indexValue?: number;
  type: 'video';
  isNew?: boolean;
};

export type galleryItem = imageItem | videoItem;

export interface IEditOfferData {
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

export interface IEditOfferInitialState {
  isEdited: boolean;
  initialOfferData: IInitialOfferData;
  editOfferData: IEditOfferData;
  paramsByService: paramsByServiceType;
  publishedData: any;
}

export type setEditOfferInitialDataActionType = {
  type: typeof SET_EDIT_OFFER_INITIAL_DATA;
  payload: {
    initialOfferData: IInitialOfferData;
    editOfferData: IEditOfferData;
    paramsByService: paramsByServiceType;
  };
};

export type resetEditOfferStoreActionType = {
  type: typeof RESET_EDIT_OFFER_STORE;
};

export type setEditOfferEditableDataActionType = {
  type: typeof SET_EDIT_OFFER_EDITABLE_DATA;
  payload: IEditOfferData;
};

export type setEditOfferPublishedDataActionType = {
  type: typeof SET_EDIT_OFFER_PUBLISHED_DATA;
  payload: any;
};

export type editOfferActionTypes =
  | setEditOfferInitialDataActionType
  | resetEditOfferStoreActionType
  | setEditOfferEditableDataActionType
  | setEditOfferPublishedDataActionType;
