import { SET_CHAT_MESSAGE_DATA, RESET_CHAT_STORE } from './constants';

export interface IFileItem {
  id: string;
  url: string;
  size: string;
  name: string;
}

export interface IMessage {
  id: number;
  senderUsername: string;
  files: IFileItem[];
  created: string;
  modified: string;
  isRemoved: boolean;
  text: string;
  read: boolean;
  sender: number;
  recipient: number;
  senderTitle: string;
}

export interface IMessageData {
  count: number;
  next: string;
  previous: string;
  results: IMessage[];
}

export interface chatInitialState {
  messageData: IMessageData;
}

export type setChatMessageDataActionType = {
  type: typeof SET_CHAT_MESSAGE_DATA;
  payload: IMessageData;
};

export type resetChatStoreActionType = {
  type: typeof RESET_CHAT_STORE;
};

export type chatActionTypes =
  | setChatMessageDataActionType
  | resetChatStoreActionType;
