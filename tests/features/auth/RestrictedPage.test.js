import React from 'react';
import { shallow } from 'enzyme';
import { RestrictedPage } from '../../../src/features/auth/RestrictedPage';

describe('auth/RestrictedPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RestrictedPage {...props} />
    );

    expect(
      renderedComponent.find('.auth-restricted-page').length
    ).toBe(1);
  });
});
