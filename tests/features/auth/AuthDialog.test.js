import React from 'react';
import { shallow } from 'enzyme';
import { AuthDialog } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AuthDialog />);
  expect(renderedComponent.find('.auth-auth-dialog').length).toBe(1);
});
