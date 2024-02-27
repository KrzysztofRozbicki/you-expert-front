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

const initialState = {
  loading: false,
  error: null,
  notifications: []
};

const notificationsStore = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS: {
      return { ...state, loading: true };
    }
    case GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        notifications: [...action.payload]
      };
    }

    case GET_NOTIFICATIONS_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }

    default: {
      return { ...state };
    }
  }
};

export default notificationsStore;
