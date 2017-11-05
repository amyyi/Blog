import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as form} from 'redux-form';

import account from './account';
import auth from './auth';
import article from './article';
import error from './error';

export default combineReducers({
  form,
  account,
  auth,
  article,
  error,
  routing: routerReducer,
});
