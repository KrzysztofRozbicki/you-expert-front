import { modalInitialState, modalActionType } from './interfaces';
import { SET_MODAL_DATA } from './constants';

const initialState: modalInitialState = {
  modalName: '',
  modalProps: null
};

const modalReducer = (
  state = initialState,
  action: modalActionType
): modalInitialState => {
  switch (action.type) {
    case SET_MODAL_DATA:
      return {
        ...state,
        modalName: action?.payload?.modalName,
        modalProps: action?.payload?.modalProps
      };
    default:
      return state;
  }
};

export default modalReducer;
