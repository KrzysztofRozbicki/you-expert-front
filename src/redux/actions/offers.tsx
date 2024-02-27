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

import {
  getAllOffers,
  createOffer,
  getOffersRetrieveSelfOfferList,
  getOfferById,
  editOffer,
  editPartialOffer,
  activateOffer,
  archiveOffer,
  deactivateOffer,
  followOffer,
  unfollowOffer,
  getOffersSelf,
  getFollowingOffers
} from '../../api/offers';
import {
  getAllOffersType,
  getAllOffersSuccessType,
  getAllOffersFailType,
  createOfferSuccessType,
  setSelfOfferListType,
  setCurrentOfferType,
  editOfferType,
  editPartionalOffer,
  activateOfferType,
  deactivateOfferType,
  archieveOfferType,
  followOfferType,
  unfollowOfferType,
  getSelfOffersType,
  getFollowingOffersType,
  IPublicUserData,
  setPublicProfileDataActionType,
  resetOffersType
} from '../interfaces/offers';
import { getPublicUserDataById } from '../../api/account';

export const resetOffersAction = (): resetOffersType => ({
  type: RESET_OFFERS
});

export const setPublicProfileDataAction = (
  payload: IPublicUserData
): setPublicProfileDataActionType => ({
  type: SET_PUBLIC_PROFILE_DATA,
  payload
});

export const getOffers = (): getAllOffersType => ({
  type: GET_ALL_OFFERS
});

export const getOffersSuccess = (offers): getAllOffersSuccessType => ({
  type: GET_ALL_OFFERS_SUCCESS,
  payload: offers
});

export const getOffersFail = (error): getAllOffersFailType => ({
  type: GET_ALL_OFFERS_FAIL,
  payload: error
});

export const getAllOffersAction = (params) => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const offersResult = await getAllOffers(params);

      if (offersResult && offersResult.data) {
        dispatch(getOffersSuccess(offersResult.data));
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

export const offerCreated = (): createOfferSuccessType => ({
  type: CREATE_OFFER_SUCCESS
});

export const createOfferAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await createOffer(data);
      if (result && result.data) {
        dispatch(offerCreated());
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

export const setSelfOffers = (data): setSelfOfferListType => ({
  type: SET_SELF_OFFER_LIST,
  payload: data
});

export const getOffersRetrieveSelfOfferListAction = () => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await getOffersRetrieveSelfOfferList();
      if (result && result.data) {
        dispatch(setSelfOffers(result.data));
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

export const setCurrentOffer = (data): setCurrentOfferType => ({
  type: SET_CURRENT_OFFER,
  payload: data
});

export const getOfferByIdAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await getOfferById(id);
      if (result && result.data) {
        dispatch(setCurrentOffer(result.data));

        try {
          const profileRes = await getPublicUserDataById(
            result?.data?.expert?.id
          );
          dispatch(setPublicProfileDataAction(profileRes?.data));
        } catch (e) {
          console.error(e);
        }
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

export const getOfferByIdAsyncAction = async (id: string): Promise<any> => {
  try {
    const response = await getOfferById(id);
    return response?.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getPublickUserDataByIdAsyncAction = async (
  id: string
): Promise<any> => {
  try {
    const response = await getPublicUserDataById(id);
    return response?.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const addCurrentOfferToStore = (offerData) => {
  return async (dispatch) => {
    dispatch(setCurrentOffer(offerData));
  };
};

export const editOfferSuccess = (): editOfferType => ({
  type: EDIT_OFFER
});

export const editOfferAction = (id, updatedData) => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await editOffer(id, updatedData);
      if (result && result.data) {
        dispatch(editOfferSuccess());
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

export const editPartialOfferSuccess = (): editPartionalOffer => ({
  type: EDIT_PARTIONAL_OFFER
});

export const editPartialOfferAction = (id, updatedData) => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await editPartialOffer(id, updatedData);
      if (result && result.data) {
        dispatch(editPartialOfferSuccess());
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

export const activateOfferSuccess = (): activateOfferType => ({
  type: ACTIVATE_OFFER
});

export const activateOfferAction = (id: number | string) => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await activateOffer(id);
      if (result && result.data) {
        dispatch(activateOfferSuccess());
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

export const deactivateOfferSuccess = (): deactivateOfferType => ({
  type: DEACTIVATE_OFFER
});

export const deactivateOfferAction = (id: number | string) => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await deactivateOffer(id);
      if (result && result.data) {
        dispatch(deactivateOfferSuccess());
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

export const archiveOfferSuccess = (): archieveOfferType => ({
  type: ARCHIVE_OFFER
});

export const archiveOfferAction = (id, updatedData) => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await archiveOffer(id, updatedData);
      if (result && result.data) {
        dispatch(archiveOfferSuccess());
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

export const followOfferSuccess = (): followOfferType => ({
  type: FOLLOW_OFFER
});

export const followOfferAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await followOffer(id);
      if (result && result.data) {
        dispatch(followOfferSuccess());
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

export const unfollowOfferSuccess = (): unfollowOfferType => ({
  type: UNFOLLOW_OFFER
});

export const unfollowOfferAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await unfollowOffer(id);
      if (result && result.data) {
        dispatch(unfollowOfferSuccess());
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

// Get liked offers

export const getSelfOffersSuccess = (offers): getSelfOffersType => ({
  type: GET_SELF_OFFERS,
  payload: offers
});

export const getSelfOffersAction = () => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await getOffersSelf();
      if (result && result.data) {
        dispatch(getSelfOffersSuccess(result.data));
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};

// Get offers related to expert

export const getFollowingOffersSuccess = (offers): getFollowingOffersType => ({
  type: GET_FOLLOWING_OFFERS,
  payload: offers
});

export const getFollowingOffersAction = () => {
  return async (dispatch) => {
    try {
      dispatch(getOffers());
      const result = await getFollowingOffers();

      if (result && result.data) {
        dispatch(getFollowingOffersSuccess(result.data));
      } else {
        dispatch(getOffersFail(''));
      }
    } catch (error) {
      dispatch(getOffersFail(error));
      console.log(error);
    }
  };
};
