import {
  SET_CURRENT_LOCALE,
  TRIGGER_AUTH_MODAL,
  SET_AUTH_DATA,
  SET_WINDOW_WIDTH,
  SET_UNREAD_MESSAGES,
  SET_LAST_OFFER_DATA
} from '../types/app';
import { LOG_OUT } from '../types/user';
import { Locale } from '../../translations/types';

export type initialStateType = {
  sidebarIsOpen: boolean;
  currentLocale: Locale | string;
  authModal: boolean;
  authRenderer: string;
  authData: any;
  windowWidth: number;
  newOrderCount: number;
  unreadDialogMessages: number;
  unreadOrderMessages: number;
  unreadNotificationCount: number;
  unreadAssignmentsMessagesCount: number;
  lastOfferData: any;
};

export type setLastOfferDataType = {
  type: typeof SET_LAST_OFFER_DATA;
  payload: any;
};

export type setLocaleType = {
  type: typeof SET_CURRENT_LOCALE;
  payload: Locale | string;
};

export type triggerAuthModal = {
  type: typeof TRIGGER_AUTH_MODAL;
  payload: { isOpen: boolean; authRenderer: string };
};

export type setAuthData = {
  type: typeof SET_AUTH_DATA;
  payload: any;
};

export type setWindowWidthActionType = {
  type: typeof SET_WINDOW_WIDTH;
  payload: number;
};

export type setUnreadMessagesActionType = {
  type: typeof SET_UNREAD_MESSAGES;
  payload: {
    newOrderCount: number;
    unreadDialogMessages: number;
    unreadOrderMessages: number;
    unreadNotificationCount: number;
    unreadAssignmentsMessagesCount: number;
  };
};

export type logOutActionType = { type: typeof LOG_OUT };

export type AppActionType = setLocaleType;

export type TriggerActionType = triggerAuthModal;

export type SetAuthData = setAuthData;
