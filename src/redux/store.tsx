import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer';

const bindMiddleware = (middleware) => {
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  return rootReducer(state, action);
};

export const makeStore = (initialState) => {
  const middlewares = [thunkMiddleware];
  const store = createStore(reducer, initialState, bindMiddleware(middlewares));
  return store;
};

const wrapper = createWrapper(makeStore, { debug: false });

export default wrapper;
