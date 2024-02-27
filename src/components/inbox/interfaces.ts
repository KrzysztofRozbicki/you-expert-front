import { SET_INBOX_DIALOGS, SET_INBOX_DIALOG_MESSAGES } from './constants';
import { IFileItem } from '../orderChat/interfaces';

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

export interface IDialogItem {
  id: number;
  created: string;
  modified: string;
  user1: number;
  user2: number;
  dialogWith: {
    avatarUrl: string;
    id: number;
    publicName: string;
    title: string;
    isExpert: boolean;
  };
  lastMessage: {
    created: string;
    file: {
      id: string;
      url: string;
      size: string;
      name: string;
    };
    id: number;
    isRemoved: boolean;
    modified: string;
    read: boolean;
    recipient: number;
    sender: number;
    senderTitle: string;
    senderUsername: string;
    text: string;
  };
}

export interface IDialogs {
  count: number;
  next: string;
  previous: string;
  results: IDialogItem[];
}

export interface IMessageItem {
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

export interface IMessages {
  count: number;
  next: string;
  previous: string;
  results: IMessageItem[];
}

export interface IInboxInitialState {
  dialogs: IDialogs;
  messages: IMessages;
}

export type setInboxDialogsActionType = {
  type: typeof SET_INBOX_DIALOGS;
  payload: IDialogs;
};

export type setInboxDialogMessagesActionType = {
  type: typeof SET_INBOX_DIALOG_MESSAGES;
  payload: IMessages;
};

export type inboxActionType =
  | setInboxDialogsActionType
  | setInboxDialogMessagesActionType;
