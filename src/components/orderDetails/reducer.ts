import {
  SET_ORDER_DETAILS_DATA,
  SET_ORDER_DETAILS_LOADING,
  RESET_ORDER_DETAILS_STORE
} from './constants';
import {
  orderDetailsInitStateType,
  orderDetailsActionType
} from './interfaces';

const initialState: orderDetailsInitStateType = {
  isLoading: false,
  data: null
};

const orderDetailsStore = (
  state = initialState,
  action: orderDetailsActionType
): orderDetailsInitStateType => {
  switch (action.type) {
    case SET_ORDER_DETAILS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_ORDER_DETAILS_DATA:
      return {
        ...state,
        data: action.payload
      };
    case RESET_ORDER_DETAILS_STORE:
      return initialState;
    default:
      return state;
  }
};

export default orderDetailsStore;
