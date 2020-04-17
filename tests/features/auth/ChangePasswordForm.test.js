import React from 'react';
import { shallow } from 'enzyme';
import { ChangePasswordForm } from '../../../src/features/auth/ChangePasswordForm';

describe('auth/ChangePasswordForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ChangePasswordForm {...props} />
    );

    expect(
      renderedComponent.find('.auth-change-password-form').length
    ).toBe(1);
  });
});
