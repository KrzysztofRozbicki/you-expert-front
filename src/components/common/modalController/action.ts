import { SET_MODAL_DATA } from './constants';
import { modalInitialState, modalActionType } from './interfaces';

export const setModalDataAction = (
  payload: modalInitialState
): modalActionType => ({
  type: SET_MODAL_DATA,
  payload
});
