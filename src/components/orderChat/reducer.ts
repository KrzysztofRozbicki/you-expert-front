import { chatInitialState, chatActionTypes } from './interfaces';
import { SET_CHAT_MESSAGE_DATA, RESET_CHAT_STORE } from './constants';

const initialState: chatInitialState = {
  messageData: null
};

const chatReducer = (
  state = initialState,
  action: chatActionTypes
): chatInitialState => {
  switch (action.type) {
    case SET_CHAT_MESSAGE_DATA:
      return {
        ...state,
        messageData: action.payload
      };
    case RESET_CHAT_STORE:
      return initialState;
    default:
      return state;
  }
};

export default chatReducer;
