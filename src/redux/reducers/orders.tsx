import {
  GET_EXPERT_OFFERS,
  GET_EXPERT_OFFERS_SUCCESS,
  GET_EXPERT_OFFERS_FAIL
} from '../types/orders';

const initialState = {
  expertOrders: [],
  userOrders: [],
  currentOrder: null,
  loading: false,
  error: null
};

const ordersStore = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPERT_OFFERS: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_EXPERT_OFFERS_SUCCESS: {
      const { payload } = action;
      const { orders, isExpert } = payload;
      if (isExpert) {
        return {
          ...state,
          expertOrders: orders,
          loading: false
        };
      }
      return {
        ...state,
        userOrders: orders,
        loading: false
      };
    }

    case GET_EXPERT_OFFERS_FAIL: {
      const { payload } = action;
      return {
        ...state,
        error: payload,
        loading: false
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default ordersStore;
