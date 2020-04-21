import React from 'react';
import { shallow } from 'enzyme';
import { RedirectPreservingNext } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RedirectPreservingNext />);
  expect(renderedComponent.find('.auth-redirect-preserving-next').length).toBe(1);
});
