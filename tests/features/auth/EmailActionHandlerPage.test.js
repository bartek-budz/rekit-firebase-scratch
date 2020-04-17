import React from 'react';
import { shallow } from 'enzyme';
import { EmailActionHandlerPage } from '../../../src/features/auth/EmailActionHandlerPage';

describe('auth/EmailActionHandlerPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EmailActionHandlerPage {...props} />
    );

    expect(
      renderedComponent.find('.auth-email-action-handler-page').length
    ).toBe(1);
  });
});
