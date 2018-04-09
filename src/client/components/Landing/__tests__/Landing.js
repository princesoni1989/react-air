/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Landing from '..';

describe(Landing.name, () => {
  it('should render correctly', () => {
    expect(shallow(<Landing />)).toMatchSnapshot();
  });
});
