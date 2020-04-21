import React from 'react';
import { shallow } from 'enzyme';
import { LinkPreservingNext } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LinkPreservingNext />);
  expect(renderedComponent.find('.auth-link-preserving-next').length).toBe(1);
});
