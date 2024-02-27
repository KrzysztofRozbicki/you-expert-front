import {
  SET_EDIT_OFFER_INITIAL_DATA,
  RESET_EDIT_OFFER_STORE,
  SET_EDIT_OFFER_EDITABLE_DATA,
  SET_EDIT_OFFER_PUBLISHED_DATA
} from './constants';
import { IEditOfferInitialState, editOfferActionTypes } from './interfaces';

const initialState: IEditOfferInitialState = {
  isEdited: false,
  editOfferData: null,
  initialOfferData: null,
  paramsByService: null,
  publishedData: null
};

const editOfferReducer = (
  state = initialState,
  action: editOfferActionTypes
): IEditOfferInitialState => {
  switch (action.type) {
    case SET_EDIT_OFFER_INITIAL_DATA:
      return {
        ...state,
        initialOfferData: action.payload?.initialOfferData,
        editOfferData: action.payload?.editOfferData,
        paramsByService: action.payload?.paramsByService
      };
    case SET_EDIT_OFFER_EDITABLE_DATA:
      return {
        ...state,
        editOfferData: action.payload
      };
    case SET_EDIT_OFFER_PUBLISHED_DATA:
      return {
        ...state,
        isEdited: true,
        publishedData: action.payload
      };
    case RESET_EDIT_OFFER_STORE:
      return initialState;
    default:
      return state;
  }
};

export default editOfferReducer;
