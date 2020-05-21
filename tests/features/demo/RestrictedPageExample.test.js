import React from 'react';
import { shallow } from 'enzyme';
import { RestrictedPageExample } from '../../../src/features/demo';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RestrictedPageExample />);
  expect(renderedComponent.find('.demo-restricted-page-example').length).toBe(1);
});
