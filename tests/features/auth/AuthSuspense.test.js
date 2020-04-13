import React from 'react';
import { shallow } from 'enzyme';
import { AuthSuspense } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AuthSuspense />);
  expect(renderedComponent.find('.auth-auth-suspense').length).toBe(1);
});
