import React from 'react';
import { shallow } from 'enzyme';
import { ExamplesNavigation } from '../../../src/features/demo';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ExamplesNavigation />);
  expect(renderedComponent.find('.demo-examples-navigation').length).toBe(1);
});
