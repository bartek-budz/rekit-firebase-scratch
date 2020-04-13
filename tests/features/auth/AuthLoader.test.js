import React from 'react';
import { shallow } from 'enzyme';
import { AuthLoader } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AuthLoader />);
  expect(renderedComponent.find('.auth-auth-loader').length).toBe(1);
});
