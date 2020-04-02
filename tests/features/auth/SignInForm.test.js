import React from 'react';
import { shallow } from 'enzyme';
import { SignInForm } from '../../../src/features/auth/SignInForm';

describe('auth/SignInForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SignInForm {...props} />
    );

    expect(
      renderedComponent.find('.auth-sign-in-form').length
    ).toBe(1);
  });
});
