import {
  GET_ALL_OFFERS,
  GET_ALL_OFFERS_SUCCESS,
  GET_ALL_OFFERS_FAIL,
  CREATE_OFFER_SUCCESS,
  SET_SELF_OFFER_LIST,
  SET_CURRENT_OFFER,
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
import { offersActionType, initialStateType } from '../interfaces/offers';

const initialState: initialStateType = {
  offers: [],
  selfOfferList: [],
  favoritOffers: [],
  expertOffers: [],
  currentOffer: null,
  publicUserData: null,
  loading: false,
  error: null
};

const appStore = (
  state = initialState,
  action: offersActionType
): initialStateType => {
  switch (action.type) {
    case GET_ALL_OFFERS: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_ALL_OFFERS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        offers: payload,
        loading: false
      };
    }

    case GET_ALL_OFFERS_FAIL: {
      const { payload } = action;
      return {
        ...state,
        error: payload,
        loading: false
      };
    }

    case CREATE_OFFER_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }

    case SET_CURRENT_OFFER: {
      const { payload } = action;
      return {
        ...state,
        currentOffer: payload,
        loading: false
      };
    }

    case SET_SELF_OFFER_LIST: {
      const { payload } = action;
      return {
        ...state,
        selfOfferList: payload,
        loading: false
      };
    }
    case EDIT_OFFER: {
      return {
        ...state,
        loading: false
      };
    }
    case EDIT_PARTIONAL_OFFER: {
      return {
        ...state,
        loading: false
      };
    }
    case ACTIVATE_OFFER: {
      return {
        ...state,
        loading: false
      };
    }

    case DEACTIVATE_OFFER: {
      return {
        ...state,
        loading: false
      };
    }

    case ARCHIVE_OFFER: {
      return {
        ...state,
        loading: false
      };
    }

    case FOLLOW_OFFER: {
      return {
        ...state,
        loading: false
      };
    }

    case UNFOLLOW_OFFER: {
      return {
        ...state,
        loading: false
      };
    }
    case GET_SELF_OFFERS: {
      return {
        ...state,
        favoritOffers: action.payload,
        loading: false
      };
    }

    case GET_FOLLOWING_OFFERS: {
      return {
        ...state,
        expertOffers: action.payload,
        loading: false
      };
    }

    case SET_PUBLIC_PROFILE_DATA: {
      return {
        ...state,
        publicUserData: action.payload
      };
    }

    case RESET_OFFERS: {
      return {
        ...state,
        offers: []
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default appStore;
