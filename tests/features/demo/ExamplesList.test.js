import React from 'react';
import { shallow } from 'enzyme';
import { ExamplesList } from '../../../src/features/demo';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ExamplesList />);
  expect(renderedComponent.find('.demo-examples-list').length).toBe(1);
});
