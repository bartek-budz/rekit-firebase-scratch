import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../src/features/auth/Login';

describe('auth/Login', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Login {...props} />
    );

    expect(
      renderedComponent.find('.auth-login').length
    ).toBe(1);
  });
});
