import React from 'react';
import { shallow } from 'enzyme';
import { ResetPassword } from '../../../src/features/auth/ResetPassword';

describe('auth/ResetPassword', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ResetPassword {...props} />
    );

    expect(
      renderedComponent.find('.auth-reset-password').length
    ).toBe(1);
  });
});
