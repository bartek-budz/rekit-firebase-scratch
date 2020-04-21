import React from 'react';
import { shallow } from 'enzyme';
import { AuthLinkTarget } from '../../../src/features/examples';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AuthLinkTarget />);
  expect(renderedComponent.find('.examples-auth-link-target').length).toBe(1);
});
