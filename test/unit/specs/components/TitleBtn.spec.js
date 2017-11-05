import React from 'react';
import {shallow} from 'enzyme';

import TitleBtn from 'src/components/TitleBtn/TitleBtn';

describe('<TitleBtn />', () => {
  let comp = null;
  let props = {};
  const articleTitle = 'HelloWorldYa';

  beforeEach(() => {

    props = {
      articleTitle,
    };

    comp = shallow(<TitleBtn {...props} />);
  });

  it('如果文字長度超過10接下來以...顯示', () => {
    const text = comp.find('.article-margin');
    expect(text.text()).toBe('HelloWorld...');
  });
});
