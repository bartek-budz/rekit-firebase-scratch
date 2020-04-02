import React from 'react';
import { shallow } from 'enzyme';
import { RestrictedContent } from '../../../src/features/auth/RestrictedContent';

describe('auth/RestrictedContent', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RestrictedContent {...props} />
    );

    expect(
      renderedComponent.find('.auth-restricted-content').length
    ).toBe(1);
  });
});
