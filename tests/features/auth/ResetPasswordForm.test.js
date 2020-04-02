import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordForm } from '../../../src/features/auth/ResetPasswordForm';

describe('auth/ResetPasswordForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ResetPasswordForm {...props} />
    );

    expect(
      renderedComponent.find('.auth-reset-password-form').length
    ).toBe(1);
  });
});
