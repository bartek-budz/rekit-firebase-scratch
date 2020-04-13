import React from 'react';
import { shallow } from 'enzyme';
import { LinkPreservingQuery } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LinkPreservingQuery />);
  expect(renderedComponent.find('.common-link-preserving-query').length).toBe(1);
});
