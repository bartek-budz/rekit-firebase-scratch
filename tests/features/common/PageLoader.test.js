import React from 'react';
import { shallow } from 'enzyme';
import { PageLoader } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PageLoader />);
  expect(renderedComponent.find('.common-page-loader').length).toBe(1);
});
