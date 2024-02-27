import { SET_INBOX_DIALOGS, SET_INBOX_DIALOG_MESSAGES } from './constants';
import { IInboxInitialState, inboxActionType } from './interfaces';

const initialState: IInboxInitialState = {
  dialogs: null,
  messages: null
};

const inboxReducer = (
  state = initialState,
  action: inboxActionType
): IInboxInitialState => {
  switch (action.type) {
    case SET_INBOX_DIALOGS:
      return {
        ...state,
        dialogs: action.payload
      };
    case SET_INBOX_DIALOG_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
};

export default inboxReducer;
