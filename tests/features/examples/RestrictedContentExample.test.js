import React from 'react';
import { shallow } from 'enzyme';
import { RestrictedContentExample } from '../../../src/features/examples';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RestrictedContentExample />);
  expect(renderedComponent.find('.examples-restricted-content-example').length).toBe(1);
});
