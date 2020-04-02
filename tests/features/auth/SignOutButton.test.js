import React from 'react';
import { shallow } from 'enzyme';
import { SignOutButton } from '../../../src/features/auth/SignOutButton';

describe('auth/SignOutButton', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SignOutButton {...props} />
    );

    expect(
      renderedComponent.find('.auth-sign-out-button').length
    ).toBe(1);
  });
});
