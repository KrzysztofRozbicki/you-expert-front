import { SET_MODAL_DATA } from './constants';

export type TextConfirmProps = {
  text: string;
  onConfirm: () => void;
  onCancel?: () => void; 
};

export type ChatFileUploadWindowProps = {
  files: File[];
  onUpload: (data: { file: string; filename: string }[]) => void;
};

export type AcceptTermsProps = {
  identificator: string;
  onConfirm: () => void;
};

export type modalProps =
  | TextConfirmProps
  | ChatFileUploadWindowProps
  | AcceptTermsProps;

export interface modalInitialState {
  modalName: 'textConfirm' | 'chatFileUploadWindow' | 'acceptTerms' | '';
  modalProps: modalProps;
}

export type modalActionType = {
  type: typeof SET_MODAL_DATA;
  payload: modalInitialState;
};
