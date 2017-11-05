import React from 'react';
import {shallow} from 'enzyme';

import FormInputConIcon from 'src/components/FormInputConIcon/FormInputConIcon';

describe('<FormInputConIcon />', () => {
  let comp = null;
  let props = {};
  const status = 'loading';

  beforeEach(() => {

    props = {
      status,
    };

  });

  it('status是loading則會有loading icon', () => {
    comp = shallow(<FormInputConIcon {...props} />);

    expect(comp.contains(<i className="icon-position fa fa-spinner"></i>)).toEqual(true);

  });
});
