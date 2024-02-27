import { combineReducers } from 'redux';
import appReducer from './app';
import offersReducer from './offers';
import categoriesStore from './categories';
import userStore from './user';
import createOfferStore from '../../components/createOffer/reducer';
import orderDetailsStore from '../../components/orderDetails/reducer';
import modalReducer from '../../components/common/modalController/reducer';
import createOrderReducer from '../../components/createOrder/reducer';
import editOfferReducer from '../../components/editOffer/reducer';
import orderChatReducer from '../../components/orderChat/reducer';
import inboxReducer from '../../components/inbox/reducer';
import orders from './orders';

const rootReducer = combineReducers({
  app: appReducer,
  offers: offersReducer,
  categories: categoriesStore,
  user: userStore,
  createOffer: createOfferStore,
  orderDetails: orderDetailsStore,
  orders,
  modal: modalReducer,
  createOrder: createOrderReducer,
  editOffer: editOfferReducer,
  orderChat: orderChatReducer,
  inbox: inboxReducer
});

export default rootReducer;
