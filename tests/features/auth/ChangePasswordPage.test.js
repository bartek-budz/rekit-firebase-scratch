import React from 'react';
import { shallow } from 'enzyme';
import { ChangePasswordPage } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ChangePasswordPage />);
  expect(renderedComponent.find('.auth-change-password-page').length).toBe(1);
});
