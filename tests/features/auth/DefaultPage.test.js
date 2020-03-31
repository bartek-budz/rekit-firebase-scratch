import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/auth/DefaultPage';

describe('auth/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.auth-default-page').length
    ).toBe(1);
  });
});
