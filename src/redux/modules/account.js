import {fromJS} from 'immutable';
import {account as cons} from '../constants';
import ApiClient from 'helpers/ApiClient';

const apiClient = new ApiClient();
const initialState = fromJS({
  load: false,
  loadSuc: false,
  loadErr: false,
  update: false,
  updateSuc: false,
  updateErr: false,
  profile: false,
  profileSuc: false,
  profileErr: false,

  initial: [],
});

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    case cons.LOAD:
      return state.merge({
        load: true,
        loadSuc: false,
        loadErr: false,
      });
    case cons.LOAD_SUCCESS:
      const members = {...action.result.contentInfo[0].members[0]};

      return state.merge({
        load: false,
        loadSuc: true,
        loadErr: false,
        initial: [members],
        ...action.result
      });
    case cons.LOAD_FAIL:
      return state.merge({
        load: false,
        loadSuc: false,
        loadErr: fromJS(action.error),
      });

    case cons.UPDATE:
      const initial = state.get('initial');
      let newArray = initial.push(action.atts.initialArray);
      if (action.atts.activeName === 'add') {
        newArray = initial.push(action.atts.initialArray);
      } else {
        newArray = initial.splice(-1, 1);
      }
      return state.merge({
        update: true,
        updateSuc: false,
        updateErr: false,
        updateAtts: fromJS(action.atts),
        initial: newArray,
      });
    case cons.UPDATE_SUCCESS:
      return state.merge({
        update: false,
        updateSuc: true,
        updateErr: false,
        ...action.result
      });
    case cons.UPDATE_FAIL:
      return state.merge({
        update: false,
        updateSuc: false,
        updateErr: fromJS(action.error),
      });

    case cons.PROFILE:
      return state.merge({
        load: true,
        loadSuc: false,
        loadErr: false,
      });
    case cons.PROFILE_SUCCESS:
      return state.merge({
        load: false,
        loadSuc: true,
        loadErr: false,
        ...action.result
      });
    case cons.PROFILE_FAIL:
      return state.merge({
        load: false,
        loadSuc: false,
        loadErr: fromJS(action.error),
      });

    default:
      return state;
  }
}

export function hasAccountInfo(globalState) {
  return globalState.account.get('blogEmail');
}

export function getAccountInfo(accountId) {
  return {
    types: [cons.LOAD, cons.LOAD_SUCCESS, cons.LOAD_FAIL],
    promises: (client) => client.get('/blog/desktop/accounts/info', {
      params: {
        accountId: accountId,
      },
    }),
    atts: {
      accountId: accountId,
    },
  };
}

export function isNameAcceptable(values) {
  return new Promise((resolve, reject) => {
    return apiClient.get('/blog/desktop/accounts/isacceptable', {
      params: {
        name: values.name,
      },
      endCallback: (err, body) => {

        if (err) {
          reject({
            name: 'The name is exist',
          });
        }
        resolve();
      },
    });
  });
}


export function updateInitial(activeName) {
  const initialArray = { addr: '', tel: '' };
  return {
    types: [cons.UPDATE, cons.UPDATE_SUCCESS, cons.UPDATE_FAIL],
    promises: (client) => client.post('/blog/desktop/accounts/update', {
      data: {
        initialArray: initialArray,
        activeName: activeName,
      },
    }),
    atts: {
      initialArray: initialArray,
      activeName: activeName,

    },
  };
}

export function updateProfile(profile) {
  return {
    types: [cons.PROFILE, cons.PROFILE_SUCCESS, cons.PROFILE_FAIL],
    promises: (client) => client.post('/blog/desktop/accounts/updateProfile', {
      data: {
        profile: profile,
      },
    }),
    atts: {
      profile: profile,

    },
  };
}
