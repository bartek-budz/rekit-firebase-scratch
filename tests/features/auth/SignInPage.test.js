import React from 'react';
import { shallow } from 'enzyme';
import { SignInPage } from '../../../src/features/auth/SignInPage';

describe('auth/SignInPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SignInPage {...props} />
    );

    expect(
      renderedComponent.find('.auth-sign-in-page').length
    ).toBe(1);
  });
});
