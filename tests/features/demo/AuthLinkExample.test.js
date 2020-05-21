import React from 'react';
import { shallow } from 'enzyme';
import { AuthLinkExample } from '../../../src/features/demo';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AuthLinkExample />);
  expect(renderedComponent.find('.demo-auth-link-example').length).toBe(1);
});
