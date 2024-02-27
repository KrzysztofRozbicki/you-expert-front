import {
  SET_ORDER_DETAILS_DATA,
  SET_ORDER_DETAILS_LOADING,
  RESET_ORDER_DETAILS_STORE
} from './constants';

interface serviceItem {
  id: number;
  name: string;
  slug: string;
}

export interface orderDetailsDataType {
  id: number;
  expertData: {
    id: number;
    publicName: string;
    title: string;
    rating: string;
    reviewCount: number;
    avatarUrl: string;
  };
  clientData: {
    id: number;
    publicName: string;
  };
  changeRequests: {
    id: number;
    description: string;
    createdAt: string;
  }[];
  quantity: number;
  totalPrice: string;
  price: string;
  variant: string;
  status: string;
  cancellationRequestClient: boolean;
  cancellationRequestExpert: boolean;
  approvalRequestedAt: string;
  payedAt: string;
  createdAt: string;
  requirementFiles: {
    id: number;
    fileUrl: string;
    description: string;
  }[];
  approvalFiles: {
    id: number;
    fileUrl: string;
    description: string;
  }[];
  offer: number;
  offerData: {
    id: number;
    title: string;
    description: string;
    representationImage: string;
    service: serviceItem;
    serviceCategory: serviceItem;
    serviceSubcategory: serviceItem;
    requirements: string;
    parameter_answers: {
      [key: string]: any;
    };
  };
  deliveryTimeInDays: number;
  deliveredAt: null | string;
  clientRequirements: string;
  isCancelable: boolean;
  representationStatus: string;
}

export interface orderDetailsInitStateType {
  isLoading: boolean;
  data: orderDetailsDataType;
}

export interface setOrderDetailsLoadingType {
  type: typeof SET_ORDER_DETAILS_LOADING;
  payload: boolean;
}

export interface setOrderDetailsDataType {
  type: typeof SET_ORDER_DETAILS_DATA;
  payload: orderDetailsDataType;
}

export interface resetOrderDetailsStoreActionType {
  type: typeof RESET_ORDER_DETAILS_STORE;
}

export type orderDetailsActionType =
  | setOrderDetailsLoadingType
  | setOrderDetailsDataType
  | resetOrderDetailsStoreActionType;
