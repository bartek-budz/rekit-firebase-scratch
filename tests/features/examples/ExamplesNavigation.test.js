import React from 'react';
import { shallow } from 'enzyme';
import { ExamplesNavigation } from '../../../src/features/examples';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ExamplesNavigation />);
  expect(renderedComponent.find('.examples-examples-navigation').length).toBe(1);
});
