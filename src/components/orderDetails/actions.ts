import axios from 'axios';
import { apiHost } from '../../api/common';
import {
  SET_ORDER_DETAILS_LOADING,
  SET_ORDER_DETAILS_DATA,
  RESET_ORDER_DETAILS_STORE
} from './constants';
import {
  orderDetailsDataType,
  setOrderDetailsLoadingType,
  setOrderDetailsDataType,
  resetOrderDetailsStoreActionType
} from './interfaces';

export const setOrderDetailsLoading = (
  payload: boolean
): setOrderDetailsLoadingType => ({ type: SET_ORDER_DETAILS_LOADING, payload });

export const setOrderDetailsData = (
  payload: orderDetailsDataType
): setOrderDetailsDataType => ({ type: SET_ORDER_DETAILS_DATA, payload });

export const resetOrderDetailsStoreAction =
  (): resetOrderDetailsStoreActionType => ({ type: RESET_ORDER_DETAILS_STORE });

export const getOrderDetailsById = async (
  orderId: string | number
): Promise<orderDetailsDataType> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiHost}/orders/${orderId}/`
    });
    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const setExpertReviewAction = async (data: {
  rating: number;
  to_user: number;
  description: string;
}): Promise<void> => {
  try {
    await axios({
      method: 'POST',
      url: `${apiHost}/accounts/rate-user/`,
      data
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const rejectOrderByClientAction = async (
  orderId: number | string
): Promise<void> => {
  try {
    await axios({
      method: 'POST',
      url: `${apiHost}/orders/${orderId}/user-reject/`
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const rejectOrderByExpertAction = async (
  orderId: number | string
): Promise<void> => {
  try {
    await axios({
      method: 'POST',
      url: `${apiHost}/orders/${orderId}/expert-reject/`
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const acceptOrderAction = async (
  orderId: number | string,
  data: {
    rating: number;
    description: string;
  }
): Promise<void> => {
  try {
    await axios({
      method: 'POST',
      url: `${apiHost}/orders/${orderId}/accept/`,
      data
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const uploadFileAction = async (
  file: {
    filename: string;
    fileBase64: string;
  },
  orderId: number | string
): Promise<void> => {
  try {
    await axios({
      method: 'POST',
      url: `${apiHost}/orders/${orderId}/upload-file/`,
      data: {
        files: [{ filename: file.filename, file: file.fileBase64 }]
      }
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteFileAction = async (
  fileId: number,
  orderId: number | string
): Promise<void> => {
  try {
    await axios({
      method: 'DELETE',
      url: `${apiHost}/orders/${orderId}/delete-file/`,
      data: { file_id: fileId }
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const requestApprovalAction = async (
  orderId: number | string
): Promise<void> => {
  try {
    await axios({
      method: 'POST',
      url: `${apiHost}/orders/${orderId}/approve/`
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const undoCancellationRequestAction = async (
  orderId: number | string
): Promise<void> => {
  try {
    await axios({
      method: 'POST',
      url: `${apiHost}/orders/${orderId}/cancel-cancellation-request/`
    });
  } catch (e) {
    throw new Error(e);
  }
};
