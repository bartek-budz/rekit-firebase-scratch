import React from 'react';
import { shallow } from 'enzyme';
import { LanguageButtonExample } from '../../../src/features/demo';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LanguageButtonExample />);
  expect(renderedComponent.find('.demo-language-button-example').length).toBe(1);
});
