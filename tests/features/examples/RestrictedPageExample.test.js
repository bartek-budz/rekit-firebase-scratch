import React from 'react';
import { shallow } from 'enzyme';
import { RestrictedPageExample } from '../../../src/features/examples';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RestrictedPageExample />);
  expect(renderedComponent.find('.examples-restricted-page-example').length).toBe(1);
});
