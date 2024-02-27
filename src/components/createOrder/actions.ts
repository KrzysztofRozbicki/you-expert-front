import axios from 'axios';
import { apiHost } from '../../api/common';
import {
  SET_CREATE_ORDER_OFFER_DATA,
  SET_CREATE_ORDER_ORDER_DATA,
  CREATE_ORDER_RESET_STORE
} from './constants';
import {
  IOfferData,
  IOrderData,
  setCreateOrderOfferDataActionType,
  setCreateOrderOfferDataPayloadType,
  setCreateOrderOrderDataActionType,
  createOrderResetStoreActionType
} from './interfaces';

export const setCreateOrderOfferDataAction = (
  payload: setCreateOrderOfferDataPayloadType
): setCreateOrderOfferDataActionType => ({
  type: SET_CREATE_ORDER_OFFER_DATA,
  payload
});

export const setCreateOrderOrderDataAction = (
  payload: IOrderData
): setCreateOrderOrderDataActionType => ({
  type: SET_CREATE_ORDER_ORDER_DATA,
  payload
});

export const createOrderResetStoreAction =
  (): createOrderResetStoreActionType => ({ type: CREATE_ORDER_RESET_STORE });

export const getOfferData = async (offerId: string): Promise<IOfferData> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiHost}/offers/${offerId}/`
    });

    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createOrderAction = async (
  orderData: IOrderData
): Promise<{
  redirectUrl: string;
  orderId: string;
}> => {
  try {
    const data = {
      quantity: orderData?.quantity,
      variant: orderData?.variant,
      client_requirements: orderData?.clientRequirements,
      offer: orderData?.offer
    };

    const res = await axios({
      method: 'POST',
      url: `${apiHost}/payments/create-order/`,
      data
    });
    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};
