import {
  SET_CREATE_ORDER_OFFER_DATA,
  SET_CREATE_ORDER_ORDER_DATA,
  CREATE_ORDER_RESET_STORE
} from './constants';

export interface IOfferData {
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
  gallery: any[];
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
}

export interface IOrderData {
  quantity: number;
  variant: string;
  clientRequirements: string;
  offer: number;
}

export interface setCreateOrderOfferDataPayloadType extends IOfferData {
  variant: string;
}

export type setCreateOrderOfferDataActionType = {
  type: typeof SET_CREATE_ORDER_OFFER_DATA;
  payload: setCreateOrderOfferDataPayloadType;
};

export type setCreateOrderOrderDataActionType = {
  type: typeof SET_CREATE_ORDER_ORDER_DATA;
  payload: IOrderData;
};

export type createOrderResetStoreActionType = {
  type: typeof CREATE_ORDER_RESET_STORE;
};

export interface ICreateOrderInitialState {
  offerData: IOfferData;
  orderData: IOrderData;
}

export type createOrderActionTypes =
  | setCreateOrderOfferDataActionType
  | setCreateOrderOrderDataActionType
  | createOrderResetStoreActionType;
