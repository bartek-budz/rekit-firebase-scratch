import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../../src/features/auth/Register';

describe('auth/Register', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Register {...props} />
    );

    expect(
      renderedComponent.find('.auth-register').length
    ).toBe(1);
  });
});
