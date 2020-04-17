import React from 'react';
import { shallow } from 'enzyme';
import { PasswordControlGroup } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PasswordControlGroup />);
  expect(renderedComponent.find('.auth-password-control-group').length).toBe(1);
});
