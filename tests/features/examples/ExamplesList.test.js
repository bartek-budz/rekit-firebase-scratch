import React from 'react';
import { shallow } from 'enzyme';
import { ExamplesList } from '../../../src/features/examples';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ExamplesList />);
  expect(renderedComponent.find('.examples-examples-list').length).toBe(1);
});
