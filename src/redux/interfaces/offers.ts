import {
  GET_ALL_OFFERS,
  GET_ALL_OFFERS_SUCCESS,
  GET_ALL_OFFERS_FAIL,
  CREATE_OFFER_SUCCESS,
  SET_CURRENT_OFFER,
  SET_SELF_OFFER_LIST,
  EDIT_OFFER,
  EDIT_PARTIONAL_OFFER,
  ACTIVATE_OFFER,
  DEACTIVATE_OFFER,
  ARCHIVE_OFFER,
  FOLLOW_OFFER,
  UNFOLLOW_OFFER,
  GET_SELF_OFFERS,
  GET_FOLLOWING_OFFERS,
  SET_PUBLIC_PROFILE_DATA,
  RESET_OFFERS
} from '../types/offers';

export interface IPublicUserData {
  avatarUrl: string;
  description: string;
  id: number;
  isExpert: boolean;
  issuingInvoices: boolean;
  offers: any[];
  publicName: string;
  rating: string;
  reviewCount: number;
  reviews: any[];
  title: string;
  uuid: string;
}

export type initialStateType = {
  offers: any;
  selfOfferList: any;
  favoritOffers: any;
  currentOffer: any;
  expertOffers: any;
  loading: boolean;
  error: any;
  publicUserData: IPublicUserData;
};

export type setPublicProfileDataActionType = {
  type: typeof SET_PUBLIC_PROFILE_DATA;
  payload: IPublicUserData;
};

export type getAllOffersType = {
  type: typeof GET_ALL_OFFERS;
};

export type getAllOffersSuccessType = {
  type: typeof GET_ALL_OFFERS_SUCCESS;
  payload: any;
};

export type getAllOffersFailType = {
  type: typeof GET_ALL_OFFERS_FAIL;
  payload: any;
};

export type createOfferSuccessType = {
  type: typeof CREATE_OFFER_SUCCESS;
};

export type setCurrentOfferType = {
  type: typeof SET_CURRENT_OFFER;
  payload: any;
};

export type setSelfOfferListType = {
  type: typeof SET_SELF_OFFER_LIST;
  payload: any;
};

export type editOfferType = {
  type: typeof EDIT_OFFER;
};

export type editPartionalOffer = {
  type: typeof EDIT_PARTIONAL_OFFER;
};

export type activateOfferType = {
  type: typeof ACTIVATE_OFFER;
};

export type deactivateOfferType = {
  type: typeof DEACTIVATE_OFFER;
};

export type archieveOfferType = {
  type: typeof ARCHIVE_OFFER;
};

export type followOfferType = {
  type: typeof FOLLOW_OFFER;
};

export type unfollowOfferType = {
  type: typeof UNFOLLOW_OFFER;
};

export type getSelfOffersType = {
  type: typeof GET_SELF_OFFERS;
  payload: any;
};

export type getFollowingOffersType = {
  type: typeof GET_FOLLOWING_OFFERS;
  payload: any;
};

export type resetOffersType = {
  type: typeof RESET_OFFERS;
};

export type offersActionType =
  | getAllOffersType
  | getAllOffersSuccessType
  | getAllOffersFailType
  | createOfferSuccessType
  | setCurrentOfferType
  | setSelfOfferListType
  | editOfferType
  | editPartionalOffer
  | activateOfferType
  | deactivateOfferType
  | archieveOfferType
  | followOfferType
  | unfollowOfferType
  | getSelfOffersType
  | getFollowingOffersType
  | setPublicProfileDataActionType
  | resetOffersType;
