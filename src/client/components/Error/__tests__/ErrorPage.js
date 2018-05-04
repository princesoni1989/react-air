/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import ErrorPage from '../ErrorPage';

describe(ErrorPage.name, () => {
  it('should render correctly when error exists on dev environment', () => {
    const error = { name: 'someName', stack: 'someStack', message: 'someMessage' };
    expect(shallow(<ErrorPage error={ error }/>)).toMatchSnapshot();
  });

  it('should render correctly when there is no error on dev environment', () => {
    expect(shallow(<ErrorPage />)).toMatchSnapshot();
  });
});
