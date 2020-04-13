import React from 'react';
import { shallow } from 'enzyme';
import { AuthRedirect } from '../../../src/features/auth/AuthRedirect';

describe('auth/AuthRedirect', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AuthRedirect {...props} />
    );

    expect(
      renderedComponent.find('.auth-auth-redirect').length
    ).toBe(1);
  });
});
