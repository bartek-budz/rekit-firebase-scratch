import React from 'react';
import { shallow } from 'enzyme';
import { EmailControl } from '../../../src/features/auth/EmailControl';

describe('auth/EmailControl', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EmailControl {...props} />
    );

    expect(
      renderedComponent.find('.auth-email-control').length
    ).toBe(1);
  });
});
