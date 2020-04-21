import React from 'react';
import { shallow } from 'enzyme';
import { RedirectToNext } from '../../../src/features/auth/RedirectToNext';

describe('auth/RedirectToNext', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RedirectToNext {...props} />
    );

    expect(
      renderedComponent.find('.auth-redirect-to-next').length
    ).toBe(1);
  });
});
