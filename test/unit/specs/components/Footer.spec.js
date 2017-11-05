import React from 'react';
import {shallow, mount} from 'enzyme';
import Footer from 'src/components/Footer/Footer';

describe('<Footer />', () => {

  it('contains copyright words', () => {
    expect(shallow(<Footer />).contains(<h2 className="footer-copyright">Copyright © 2016 Nogle All rights reserved.
      </h2>)).toEqual(true);
  });
});
