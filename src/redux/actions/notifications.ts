import {
  getNotifications,
  saveNotifications,
  unsaveNotifications
} from '../../api/notifications';
import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  SAVE_NOTIFICATION,
  SAVE_NOTIFICATION_SUCCESS,
  SAVE_NOTIFICATION_FAIL,
  UNSAVE_NOTIFICATION,
  UNSAVE_NOTIFICATION_SUCCESS,
  UNSAVE_NOTIFICATION_FAIL
} from '../types/notifications';

// Get notifications

export const getNotification = () => ({
  type: GET_NOTIFICATIONS
});

export const getNotificationSuccess = (data) => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: data
});

export const getNotificationFail = (error) => ({
  type: GET_NOTIFICATIONS_FAIL,
  payload: error
});

export const getNotificationsAction = (page, pageSize) => {
  return async (dispatch) => {
    try {
      dispatch(getNotification());
      const result = await getNotifications(page, pageSize);
      if (result.data) {
        dispatch(getNotificationSuccess(result.data.results));
      } else {
        dispatch(getNotificationFail('Somethin went wrong'));
      }
    } catch (error) {
      dispatch(getNotificationFail('Somethin went wrong'));
      console.log(error);
    }
  };
};

// Save notification

export const saveNotification = () => ({
  type: SAVE_NOTIFICATION
});

export const saveNotificationSuccess = (data) => ({
  type: SAVE_NOTIFICATION_SUCCESS,
  payload: data
});

export const saveNotificationFail = (error) => ({
  type: SAVE_NOTIFICATION_FAIL,
  payload: error
});

export const saveNotificationAction = (id, page, pageSize) => {
  return async (dispatch) => {
    try {
      dispatch(getNotification());
      const result = await saveNotifications(id);
      if (result.data) {
        dispatch(getNotificationSuccess(result.data));
        dispatch(getNotificationsAction(page, pageSize));
      } else {
        dispatch(getNotificationFail('Somethin went wrong'));
      }
    } catch (error) {
      dispatch(getNotificationFail('Somethin went wrong'));
      console.log(error);
    }
  };
};

// Unsave notification

export const unsaveNotification = () => ({
  type: UNSAVE_NOTIFICATION
});

export const unsaveNotificationSuccess = (data) => ({
  type: UNSAVE_NOTIFICATION_SUCCESS,
  payload: data
});

export const unsaveNotificationFail = (error) => ({
  type: UNSAVE_NOTIFICATION_FAIL,
  payload: error
});

export const unsaveNotificationAction = (id, page, pageSize) => {
  return async (dispatch) => {
    try {
      dispatch(getNotification());
      const result = await unsaveNotifications(id);
      if (result.data) {
        dispatch(getNotificationSuccess(result.data));
        dispatch(getNotificationsAction(page, pageSize));
      } else {
        dispatch(getNotificationFail('Somethin went wrong'));
      }
    } catch (error) {
      dispatch(getNotificationFail('Somethin went wrong'));
      console.log(error);
    }
  };
};
