import React from 'react';
import { shallow } from 'enzyme';
import { PopUp } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PopUp />);
  expect(renderedComponent.find('.common-pop-up').length).toBe(1);
});
