import React from 'react';
import { shallow } from 'enzyme';
import { AuthLink } from '../../../src/features/auth/AuthLink';

describe('auth/AuthLink', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AuthLink {...props} />
    );

    expect(
      renderedComponent.find('.auth-auth-link').length
    ).toBe(1);
  });
});
