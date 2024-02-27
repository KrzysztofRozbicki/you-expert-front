import {
  SET_CURRENT_LOCALE,
  TRIGGER_AUTH_MODAL,
  SET_AUTH_DATA,
  SET_WINDOW_WIDTH,
  SET_UNREAD_MESSAGES,
  SET_LAST_OFFER_DATA
} from '../types/app';
import { LOG_OUT } from '../types/user';
import {
  AppActionType,
  TriggerActionType,
  initialStateType,
  SetAuthData,
  setWindowWidthActionType,
  logOutActionType,
  setUnreadMessagesActionType,
  setLastOfferDataType
} from '../interfaces/app';

const initialState: initialStateType = {
  sidebarIsOpen: false,
  currentLocale: 'en',
  authModal: false,
  authRenderer: '',
  authData: null,
  windowWidth: 0,
  newOrderCount: 0,
  unreadDialogMessages: 0,
  unreadOrderMessages: 0,
  unreadNotificationCount: 0,
  unreadAssignmentsMessagesCount: 0,
  lastOfferData: null
};

const appStore = (
  state = initialState,
  action:
    | AppActionType
    | TriggerActionType
    | SetAuthData
    | setWindowWidthActionType
    | logOutActionType
    | setUnreadMessagesActionType
    | setLastOfferDataType
): initialStateType => {
  switch (action.type) {
    case SET_CURRENT_LOCALE: {
      return { ...state, currentLocale: action.payload };
    }
    case TRIGGER_AUTH_MODAL: {
      return {
        ...state,
        authModal: action.payload.isOpen,
        authRenderer: action.payload.authRenderer
      };
    }
    case SET_AUTH_DATA: {
      return { ...state, authData: action.payload };
    }
    case SET_WINDOW_WIDTH: {
      return {
        ...state,
        windowWidth: action.payload
      };
    }
    case SET_UNREAD_MESSAGES: {
      return {
        ...state,
        newOrderCount: action?.payload?.newOrderCount,
        unreadDialogMessages: action?.payload?.unreadDialogMessages,
        unreadOrderMessages: action?.payload?.unreadOrderMessages,
        unreadNotificationCount: action?.payload?.unreadNotificationCount,
        unreadAssignmentsMessagesCount: action?.payload?.unreadAssignmentsMessagesCount,
      };
    }
    case SET_LAST_OFFER_DATA: {
      return {
        ...state,
        lastOfferData: action?.payload
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        newOrderCount: 0,
        unreadDialogMessages: 0,
        unreadOrderMessages: 0
      };
    }
    default: {
      return state;
    }
  }
};

export default appStore;
