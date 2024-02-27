import axios from 'axios';
import { apiHost } from '../../api/common';
import {
  SET_CURRENT_LOCALE,
  TRIGGER_AUTH_MODAL,
  SET_AUTH_DATA,
  SET_WINDOW_WIDTH,
  SET_UNREAD_MESSAGES,
  SET_LAST_OFFER_DATA
} from '../types/app';
import {
  setLocaleType,
  setWindowWidthActionType,
  setUnreadMessagesActionType,
  setLastOfferDataType
} from '../interfaces/app';
import { Locale } from '../../translations/types';
import { getNumberFromNumber } from '../../utils';

export const setLastOfferData = (payload: any): setLastOfferDataType => ({
  type: SET_LAST_OFFER_DATA,
  payload
});

const setLocale = (locale: Locale | string): setLocaleType => ({
  type: SET_CURRENT_LOCALE,
  payload: locale
});

export const setCurrentLocale = (locale: Locale | string) => {
  return async (dispatch) => {
    dispatch(setLocale(locale));
  };
};

export const triggerAuthModal = (
  isOpen: boolean,
  authRenderer?: string | undefined
) => ({
  type: TRIGGER_AUTH_MODAL,
  payload: { isOpen, authRenderer }
});

export const setAuthDataToApp = (authData) => ({
  type: SET_AUTH_DATA,
  payload: authData
});

export const setWindowWidthAction = (
  payload: number
): setWindowWidthActionType => ({
  type: SET_WINDOW_WIDTH,
  payload
});

export const setUnreadMessages = (payload: {
  newOrderCount: number;
  unreadDialogMessages: number;
  unreadOrderMessages: number;
  unreadNotificationCount: number;
  unreadAssignmentsMessagesCount: number;
}): setUnreadMessagesActionType => ({
  type: SET_UNREAD_MESSAGES,
  payload
});

export const getUnreadMessagesState = () => {
  return async (dispatch) => {
    try {
      const messagesRes = await axios({
        method: 'GET',
        url: `${apiHost}/messages/unread_count/`
      });

      dispatch(
        setUnreadMessages({
          newOrderCount: getNumberFromNumber(messagesRes?.data?.newOrderCount),
          unreadDialogMessages: getNumberFromNumber(
            messagesRes?.data?.unreadDialogMessageCount
          ),
          unreadOrderMessages: getNumberFromNumber(
            messagesRes?.data?.unreadOrderMessagesCount
          ),
          unreadNotificationCount: getNumberFromNumber(
            messagesRes?.data?.unreadNotificationCount
          ),
          unreadAssignmentsMessagesCount: getNumberFromNumber(
            messagesRes?.data?.unreadAssignmentsMessagesCount
          )
        })
      );
    } catch (e) {
      console.error(e);
    }
  };
};
