import React from 'react';
import { shallow } from 'enzyme';
import { SignUpPage } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SignUpPage />);
  expect(renderedComponent.find('.auth-sign-up-page').length).toBe(1);
});
