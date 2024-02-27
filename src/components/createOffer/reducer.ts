import {
  SET_CREATE_OFFER_STATE,
  SET_CREATE_OFFER_LOADING,
  SET_CREATE_OFFER_PARAMS,
  RESET_CREATE_OFFER_STORE,
  SET_CREATE_OFFER_CATEGORIES,
  SET_CREATE_OFFER_PUBLISHED_DATA,
} from './constants';
import { MIN_OFFER_COMMISSION } from '../../common/constants';
import { createOfferInitialState, createOfferActions } from './interfaces';

const initialState: createOfferInitialState = {
  isLoading: false,
  offer: {
    serviceTitle: '',
    category: {
      label: '',
      value: '',
      slug: ''
    },
    subcategory: {
      label: '',
      value: '',
      slug: ''
    },
    service: {
      label: '',
      value: '',
      slug: ''
    },
    pricing: {
      basic: {
        isOn: true,
        deliveryTime: '',
        price: '',
        params: []
      },
      standard: {
        isOn: false,
        deliveryTime: '',
        price: '',
        params: []
      },
      premium: {
        isOn: false,
        deliveryTime: '',
        price: '',
        params: []
      }
    },
    description: '',
    requirements: '',
    commission: `${MIN_OFFER_COMMISSION}`,
    images: [],
    videos: []
  },
  paramsByService: {
    name: '',
    slug: '',
    parameters: []
  },
  isPublished: false,
  publishedData: null,
  categories: [],
  subcategories: []
};

const createOfferStore = (
  state = initialState,
  action: createOfferActions
): createOfferInitialState => {
  switch (action.type) {
    case SET_CREATE_OFFER_STATE:
      return {
        ...state,
        offer: {
          ...state.offer,
          ...action.payload
        }
      };
    case SET_CREATE_OFFER_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_CREATE_OFFER_PARAMS:
      return {
        ...state,
        paramsByService: action.payload.paramsByService,
        offer: {
          ...state.offer,
          pricing: {
            ...state.offer.pricing,
            basic: {
              ...state.offer.pricing.basic,
              isOn: true,
              deliveryTime: '',
              price: '',
              params: action.payload.pricingParams
            },
            standard: {
              ...state.offer.pricing.standard,
              isOn: false,
              deliveryTime: '',
              price: '',
              params: action.payload.pricingParams
            },
            premium: {
              ...state.offer.pricing.premium,
              isOn: false,
              deliveryTime: '',
              price: '',
              params: action.payload.pricingParams
            }
          }
        }
      };
    case SET_CREATE_OFFER_PUBLISHED_DATA:
      return {
        ...state,
        isPublished: true,
        publishedData: action.payload
      };
    case SET_CREATE_OFFER_CATEGORIES:
      return {
        ...state,
        categories: action.payload?.categories,
        subcategories: action.payload?.subcategories
      };
    case RESET_CREATE_OFFER_STORE:
      return initialState;
    default:
      return state;
  }
};

export default createOfferStore;
