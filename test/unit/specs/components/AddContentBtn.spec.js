import React from 'react';
import {shallow} from 'enzyme';

import AddContentBtn from 'src/components/RenderMember/AddContentBtn';

describe('<AddContentBtn />', () => {
  let comp = null;
  let button = null;

  beforeEach(() => {
    spyOn(AddContentBtn.prototype, '_addInfo');

  });

  it('按下按鈕會執行addInfo function', () => {
    comp = shallow(<AddContentBtn />);
    button = comp.find('button');

    // click
    button.simulate('click');
    expect(AddContentBtn.prototype._addInfo).toHaveBeenCalledTimes(1);

  });
});
