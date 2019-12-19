import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import itemReducer from './itemReducer';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  itemReducer,
});

export default rootReducer;
