import {fromJS} from 'immutable';
import {auth as cons} from '../constants';
import createWebStorage from '../../utils/createWebStorage';

const localStorage = createWebStorage();
const initialState = fromJS({
  isSignin: false,
  isSigninSuc: false,
  isSigninErr: false,
  signin: false,
  signinSuc: false,
  signinErr: false,
  signout: false,
  signoutSuc: false,
  signoutErr: false,
});

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    case cons.IS_SIGNIN:
      return state.merge({
        isSignin: true,
        isSigninSuc: false,
        isSigninErr: false,
      });
    case cons.IS_SIGNIN_SUCCESS:
      return state.merge({
        isSignin: false,
        isSigninSuc: true,
        isSigninErr: false,
      });
    case cons.IS_SIGNIN_FAIL:

      localStorage.remove('isAuth');

      return state.merge({
        isSignin: false,
        isSigninSuc: false,
        isSigninErr: true,
      });
    case cons.SIGNIN:
      return state.merge({
        signin: true,
        signinSuc: false,
        signinErr: false,
      });
    case cons.SIGNIN_SUCCESS:
      localStorage.set('isAuth', {
        accountId: action.result.accountId,
      }, 0);

      return state.merge({
        signin: false,
        signinSuc: true,
        signinErr: false,
      });
    case cons.SIGNIN_FAIL:

      localStorage.remove('isAuth');

      return state.merge({
        signin: false,
        signinSuc: false,
        signinErr: fromJS(action.error),
      });
    case cons.SIGNOUT:
      return state.merge({
        signout: true,
        signoutSuc: false,
        signoutErr: false,
      });
    case cons.SIGNOUT_SUCCESS:
      localStorage.remove('isAuth');

      return state.merge({
        signout: false,
        signoutSuc: true,
        signoutErr: false,
      });
    case cons.SIGNOUT_FAIL:
      return state.merge({
        signout: false,
        signoutSuc: false,
        signoutErr: fromJS(action.error),
      });
    default:
      return state;
  }
}

/*
如果回傳不是plain object, 不可用this.props.xxx方式使用，
redux會把它當成action處理，而導致在firefox, safari, IE上發生錯誤!
*/

export function isSignin() {
  return localStorage.get('isAuth');
}

export function getAccountId() {
  return localStorage.get('isAuth') ? localStorage.get('isAuth').data.accountId : '';
}

export function signin(data) {
  return {
    types: [cons.SIGNIN, cons.SIGNIN_SUCCESS, cons.SIGNIN_FAIL],
    promises: (client) => client.post('/blog/desktop/auth/login', {
      data: {
        id: data.account,
        pass: data.password,
      },
    }),
  };
}

export function signout() {
  return {
    types: [cons.SIGNOUT, cons.SIGNOUT_SUCCESS, cons.SIGNOUT_FAIL],
    promises: (client) => client.post('/blog/desktop/auth/logout'),
  };
}

