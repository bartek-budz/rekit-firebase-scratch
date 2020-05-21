import React from 'react';
import { shallow } from 'enzyme';
import { AuthLinkTarget } from '../../../src/features/demo';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AuthLinkTarget />);
  expect(renderedComponent.find('.demo-auth-link-target').length).toBe(1);
});
