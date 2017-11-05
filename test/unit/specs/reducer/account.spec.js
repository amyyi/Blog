import {fromJS} from 'immutable';
import {account as cons} from 'src/redux/constants';
import reducer from 'src/redux/modules/account';

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

const accountId = 'amy.lu@nogle.com';
const result = {
  contentInfo: [{
    members: [{
      addr: 'Taipei',
      tel: '02-1234567',
    }],
  }],
}

describe('redux/modules/account', () =>{

  it('updateContentInfo', () => {
    const action = {
      type: cons.UPDATE_SUCCESS,
      atts: {
        activeName: 'add',
        initialArray: { addr: '', tel: '' },
      },
    };
    const updateState = reducer(initialState, action);
    const sucUpdate = updateState.get('updateSuc');

    expect(sucUpdate).toEqual(true);
  });

  it('get default content info', () => {
    const action = {
      type: cons.LOAD_SUCCESS,
      result: result,
    };
    const updateState = reducer(initialState, action);
    const sucUpdate = updateState.get('loadSuc');

    expect(sucUpdate).toEqual(true);
  });

});
