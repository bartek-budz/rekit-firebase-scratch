import React from 'react';
import { shallow } from 'enzyme';
import { SignUpForm } from '../../../src/features/auth/SignUpForm';

describe('auth/SignUpForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SignUpForm {...props} />
    );

    expect(
      renderedComponent.find('.auth-sign-up-form').length
    ).toBe(1);
  });
});
