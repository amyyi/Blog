import React from 'react';
import {shallow} from 'enzyme';

import TitleInput from 'src/components/EditDialog/TitleInput';

describe('<TitleInput />', () => {
  let comp = null;
  let props = {};
  let isLoaded = false;  // success be true
  let hasData = undefined;
  let loaderr = false;
  let touched = false;
  let input = { value: '2222'};
  const counter = 15 - +(input.value.length);


  beforeEach(() => {
    props = {
      meta: { touched },
      input,
    };

  });

  it('touch input時會顯示目前還剩多少個字可以輸入', () => {
    comp = shallow(<TitleInput {...props} />);
    input = comp.find('input');
    comp.setState({
      showCount: true,
    });
    expect(comp.find('.input-count').hasClass('show')).toBe(true);

    comp.setState({
      showCount: '',
    });
    expect(comp.find('.input-count').hasClass('show')).toBe(false);

  });

});
