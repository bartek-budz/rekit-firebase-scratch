import React from 'react';
import { shallow } from 'enzyme';
import { LanguageButtonExample } from '../../../src/features/examples';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LanguageButtonExample />);
  expect(renderedComponent.find('.examples-language-button-example').length).toBe(1);
});
