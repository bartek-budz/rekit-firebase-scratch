import React from 'react';
import { shallow } from 'enzyme';
import { VerifyEmailPage } from '../../../src/features/auth/VerifyEmailPage';

describe('auth/VerifyEmailPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <VerifyEmailPage {...props} />
    );

    expect(
      renderedComponent.find('.auth-verify-email-page').length
    ).toBe(1);
  });
});
