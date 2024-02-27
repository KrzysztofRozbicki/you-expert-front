import {
  SET_CREATE_ORDER_OFFER_DATA,
  SET_CREATE_ORDER_ORDER_DATA,
  CREATE_ORDER_RESET_STORE
} from './constants';
import { ICreateOrderInitialState, createOrderActionTypes } from './interfaces';

const initState: ICreateOrderInitialState = {
  offerData: null,
  orderData: {
    offer: null,
    variant: '',
    quantity: 1,
    clientRequirements: ''
  }
};

const createOrderReducer = (
  state = initState,
  action: createOrderActionTypes
): ICreateOrderInitialState => {
  switch (action.type) {
    case SET_CREATE_ORDER_OFFER_DATA:
      return {
        ...state,
        offerData: action.payload,
        orderData: {
          ...state.orderData,
          offer: action.payload?.id,
          variant: action.payload?.variant
        }
      };
    case SET_CREATE_ORDER_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload
      };
    case CREATE_ORDER_RESET_STORE:
      return initState;
    default:
      return state;
  }
};

export default createOrderReducer;
