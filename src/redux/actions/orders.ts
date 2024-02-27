import {
  GET_EXPERT_OFFERS,
  GET_EXPERT_OFFERS_SUCCESS,
  GET_EXPERT_OFFERS_FAIL
} from '../types/orders';
import {
  getActiveExpertOrders,
  getExpertHistoricalOrders,
  getActiveUserOrders,
  getHistoricalUserOrders,
  getUserDashboardOrders,
  getExpertDashboardAssignments
} from '../../api/orders';

const getOrdersByFilters = async (
  isExpert: boolean,
  isAvtiveOrders: boolean
) => {
  if (isExpert) {
    return isAvtiveOrders
      ? await getActiveExpertOrders()
      : await getExpertHistoricalOrders;
  } else {
    return isAvtiveOrders
      ? await getActiveUserOrders()
      : await getHistoricalUserOrders;
  }
};

const getExpertOrderss = () => ({
  type: GET_EXPERT_OFFERS
});

export const getExpertOrdersSuccess = (orders: any, isExpert: boolean) => ({
  type: GET_EXPERT_OFFERS_SUCCESS,
  payload: { orders: orders, isExpert }
});

const getExpertOrdersFail = (message) => ({
  type: GET_EXPERT_OFFERS_FAIL,
  payload: message
});

export const getOrdersAction = (isExpert: boolean, isAvtiveOrders: boolean) => {
  return async (dispatch) => {
    try {
      dispatch(getExpertOrderss());
      const result = isExpert
        ? await getExpertDashboardAssignments(isAvtiveOrders, !isAvtiveOrders)
        : await getUserDashboardOrders(isAvtiveOrders, !isAvtiveOrders);
      if (result) {
        const orders = result?.data?.sort((a, b) =>
          a?.createdAt > b?.createdAt ? -1 : 1
        );
        
        dispatch(getExpertOrdersSuccess(orders, isExpert));
      } else {
        dispatch(getExpertOrdersFail('Something went wrong.'));
      }
    } catch (error) {
      dispatch(getExpertOrdersFail(error));
    }
  };
};
