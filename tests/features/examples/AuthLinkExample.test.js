import React from 'react';
import { shallow } from 'enzyme';
import { AuthLinkExample } from '../../../src/features/examples';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AuthLinkExample />);
  expect(renderedComponent.find('.examples-auth-link-example').length).toBe(1);
});
