import React from 'react';
import { shallow } from 'enzyme';
import { FakeLink } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FakeLink />);
  expect(renderedComponent.find('.common-fake-link').length).toBe(1);
});
